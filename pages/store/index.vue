<template lang="pug">
  view(style="margin-bottom:100upx")
    home-header(v-if="couponId")
    view(v-else)
      view.response.radius.header-bg(style="position: absolute; top: 0;height: 350upx;z-index:-1")
        image(mode="aspectFill" :src="require('../../static/bg_user_top.jpg')")
      view.padding-lg(style="margin-top:70upx")
        view.text-white.flex
          view.margin-left.flex.flex-direction.justify-between.padding-tb-xs
            view.flex.justify-start.align-end
              text.text-xxl {{store.currentStore.name}}
              text.margin-left-sm.cu-tag.round(style="background: rgba(0,0,0,0.2)") {{store.currentStore.phone}}
            view.padding-top-sm
              text {{store.currentStore.address}}
    view.text-center.padding(v-if="claimedCoupons.length > 0")
      view.margin-top-xl.text-xl {{ claimedCoupons.some(code => code.claimed) ? '您已领取过此优惠' : '恭喜获得优惠券' }}
      coupon-item(v-for="(item,index) in claimedCoupons" :key="index" :item="item")
    view.flex.align-center.justify-center.no-coupon(v-else)
      image(mode="aspectFit" :src="require('../../static/no_coupon.jpg')")
    tab-bar.bottom-fixed(redirect)
</template>

<script>
import * as api from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      id: null,
      couponId: null,
      claimedCoupons: []
    };
  },
  onLoad(data) {
    this.id = data.id;
    this.couponId = data.coupon;
    this.store.currentStore.id = this.id;
    this.claimCoupons();
  },
  computed: {
    user: sync("auth/user"),
    store: sync("store"),
    position: sync("position"),
    coupons: sync("auth/coupons")
  },
  methods: {
    async claimCoupons() {
      const { openid } = this.user;
      const { latitude, longitude } = this.position;
      let couponIds = [];

      if (this.couponId) {
        couponIds = [this.couponId];
      } else if (this.store.currentStore.id) {
        if (!this.store.currentStore.validCoupons) {
          this.store.currentStore = (await api.getShop({
            id: this.store.currentStore.id,
            latitude,
            longitude
          })).data;
        }
        couponIds = this.store.currentStore.validCoupons.map(i => i.id);
      }

      if (couponIds.length > 0) {
        const res = await api.claimCoupons({
          openid,
          couponIds,
          customerNickname: this.user.nickName
        });
        this.claimedCoupons = res.data;
        this.coupons = this.coupons.concat(this.claimedCoupons);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.no-coupon
  height 70vh
  image
    width 300upx
.header-bg
  image
    width 100%
    height 100%
</style>

