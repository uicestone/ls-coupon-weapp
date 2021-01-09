<template lang="pug">
  view
    view.flex.flex-direction(v-if="isBindManager" style="height:calc(100vh - 100upx)")
      view.cu-form-group
        view.title 真实姓名
        input(v-model="form.managerName" placeholder="填写您的真实姓名")
      view.cu-bar.search.bg-white
        view.search-form.round
          text.cuIcon-search
          input(v-model="searchText"  :adjust-position='false' type='text' placeholder='搜索门店' confirm-type='search')
        view.action(@click="search")
          button.cu-btn.bg-red.shadow-blur.round 搜索
      view
        view.cu-list.menu.sm-border.card-menu.margin-top(v-if="_store.length || searchText" style="margin-bottom:200upx" )
          view.cu-item.padding(v-for="(item,index) in _store" :key="index" @click="selectStore(item)" :class="[form.shopId==item.id ? 'selected':'' ]")
            view(style="flex:1")
              image.logo(:src="require('../../static/logo.png')")
            view(style="flex:6") 东方既白{{item.name}}
            view.text-sm.text-grey.flex.adjust-end(v-if="item.distance" style="flex:1") {{item.distance}}km
        view(v-else)
            view.load-progress
              view.load-progress-spinner()
      view.flex.align-end.flex-sub.bind-button
        button.cu-btn.lg.bg-red.flex-sub.margin(@click="bindManager")
          text.cuIcon-shop.text-white.margin-right-sm
          text 绑定
    view.flex.flex-direction(v-if="!isBindManager" style="height:calc(100vh - 100upx)")
      view.cu-bar.flex.justify-between.padding-lr.bg-white
        text.text-lg 优惠券核销
        text.text-lg {{ user.manageShop.name }}
      view.cu-list.menu.sm-border.card-menu.margin-top
        view.cu-item.code-item.padding.flex.flex-direction(v-for="code in recentCodes" :key="code.id")
          view.flex.justify-between.padding-top-xl(style="width:100%")
            view.flex.flex-direction
              view.code-string {{ code.codeString | codeStringLayout }}
              view {{ code.customerNickname }}
            view.flex.flex-direction
              view {{ code.usedTime.substr(8,8) }}
              view 店员：{{ code.managerName }}
          view.padding-bottom-xl.padding-top-sm(style="width:100%") {{ code.coupon.desc }}
      view.flex.align-end.flex-sub
        button.cu-btn.lg.bg-red.flex-sub.margin(@click="scanQrcode")
          text.cuIcon-scan.text-white.margin-right-sm
          text 扫码
</template>


<script>
import * as api from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      searchText: null,
      form: {
        shopId: null,
        managerName: null
      },
      couponDetail: {},
      recentCodes: []
    };
  },
  computed: {
    user: sync("auth/user"),
    position: sync("position"),
    params: sync("params"),
    store: sync("store"),
    _store() {
      if (this.searchText) {
        return this.store.list.filter(i => i.name.includes(this.searchText));
      }
      return this.store.list;
    },
    isBindManager() {
      if (_.get(this.user, "manageShop.id")) {
        return false;
      }
      return this.params.manager;
    }
  },
  methods: {
    async init() {
      if (_.get(this.user, "manageShop.id")) {
        this.recentCodes = (await api.getRecentCodes({
          shopId: this.user.manageShop.id,
          openid: this.user.openid
        })).data;
      }
      this.getStore();
    },
    async selectStore(item) {
      this.form.shopId = item.id;
    },
    async getStore() {
      const res = await api.getNearShop(this.position);
      this.store.list = res.data;
    },
    search() {
      this.searchText = "";
    },
    async bindManager() {
      const { openid, nickName } = this.user;
      const { shopId, managerName } = this.form;

      if (!shopId || !managerName) {
        uni.showToast({ title: "信息填写不全", icon: "none" });
        return;
      }

      const res = await api.bindManager({
        openid,
        nickname: nickName,
        shopId,
        displayName: managerName
      });
      this.user = { ...this.user, ...res.data };
      this.params.manager = false;
      this.init();
    },
    scanQrcode() {
      uni.scanCode({
        success: async code => {
          console.log(code);
          if (code.result) {
            const res = await api.checkCoupons({
              codeString: code.result,
              openid: this.user.openid
            });
            this.couponDetail = res.data;
            console.log(this.couponDetail);
            uni.showModal({
              title: this.couponDetail.wasUsed ? "先前已被核销" : "核销成功",
              content:
                this.couponDetail.codeString +
                " " +
                this.couponDetail.coupon.desc,
              showCancel: false
            });
          }
        }
      });
    }
  },
  async mounted() {
    this.init();
  },
  filters: {
    codeStringLayout(input) {
      return input.match(/.{1,4}/g).join(" ");
    }
  }
};
</script>

<style lang="stylus" scoped>
.selected
  color green
.bind-button
  position fixed
  bottom 80upx
  width 100%
  left 0
.code-item
  font-family 'Courier New', Courier, monospace
  .code-string
    font-weight bold
    font-size 130%
</style>
