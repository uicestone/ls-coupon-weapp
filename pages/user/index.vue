<template lang="pug">
  view(style="margin-bottom:100rpx")
    view.response.radius.header-bg(style="position: absolute; top: 0;height: 286upx;z-index:-1")
      image(mode="aspectFill" :src="require('../../static/bg_user_top.jpg')")
    view.padding-lg(style="margin-top:70upx")
      view.text-white.flex
        //- view.cu-avatar.round.xl(:style="[{ backgroundImage:'url(' +user.avatarUrl +')' }]")
        view.cu-avatar.round.xl(style="overflow: hidden;box-shadow: 0 0 15rpx 10rpx rgba(255,255,255,0.2)")
          open-data(type="userAvatarUrl" style="height:100%")
        view.margin-left.flex.flex-direction.justify-between.padding-tb-xs
          //- view.text-xxl {{user.nickName}}
          open-data.text-xxl(type="userNickName")
          view.padding-sm.cu-tag.round(style="background: rgba(0,0,0,0.2)")
            text {{coupons.length}} 张优惠券
      view(style="margin-top:80upx")
        coupon-item(v-for="(item,index) in coupons" :key="index" :item="item")

</template>


<script>
import { sync } from "vuex-pathify";
import * as api from "../../common/vmeitime-http";

export default {
  data() {
    return {};
  },
  computed: {
    user: sync("auth/user"),
    auth: sync("auth"),
    coupons: sync("auth/coupons")
  },
  mounted() {
    this.getCoupons();
    if (!this.user.openid) {
      this.auth.showLogin = true;
    }
  },
  methods: {
    async getCoupons() {
      const { openid } = this.user;
      const res = await api.getCoupons({ openid });
      this.coupons = res.data.sort((a, b) => {
        if (a.used) return true;
        return false;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .header-bg
    image
      width 100%
      height 100%
</style>
