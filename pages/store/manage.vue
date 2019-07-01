<template lang="pug">
  view.flex.flex-direction(style="height:calc(100vh - 100upx)")
    view.cu-bar.flex.justify-between.padding-left.bg-white
      text.text-lg 店员端
    view.flex.align-end.flex-sub
      button.cu-btn.lg.bg-green.flex-sub.margin(@click="scanQrcode")
        text.cuIcon-scan.text-white.margin-right-sm
        text 扫码
</template>


<script>
import * as api from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      couponDetail: {}
    };
  },
  computed: {
    user: sync("auth/user")
  },
  methods: {
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
              content: this.couponDetail.codeString + " " + this.couponDetail.coupon.desc,
              showCancel: false
            });
          }
        }
      });
    }
  }
};
</script>
