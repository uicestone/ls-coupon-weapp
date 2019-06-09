<template lang="pug">
  view
    view.response.bg-green(style="position: absolute; top: 0;height: 440upx;z-index:-1")
    view.padding
      view.text-white
        view.text-xxl.padding-tb {{user.nickName}}
        view.text-lg 年龄: {{user.age || ''}}
        view.text-lg 所在地: {{user.province || ''}}
        view.text-lg 优惠券数量:
        navigator(url="/pages/user/edit")
          button.cu-btn.line-white.block.lg.margin-top
            text.cuIcon-edit 完善个人资料
      view.cu-bar.margin-top.bg-white(v-for="(item,index) in coupons" :key="index")
        view.action
          text.text-lg {{item.coupon.desc}}
        view.padding
          button.cu-btn.round.bg-red(@click="goCouponDetail(item)") 去使用

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
    coupons: sync("auth/coupons")
  },
  mounted() {
    this.getCoupons();
  },
  methods: {
    async getCoupons() {
      const { openid } = this.user;
      const res = await api.getCoupons({ openid });
      this.coupons = res.data;
    },
    goCouponDetail(item) {
      uni.navigateTo({
        url: `/pages/coupon/detail?id=${item.id}`
      });
    }
  }
};
</script>
