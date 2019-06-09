<template lang="pug">
  view.cu-bar.flex.justify-between.padding-left.bg-white
    text.text-lg 店员端
    view.action(@click="scanQrcode")
      view.cuIcon-scan.text-green
      view.text-green.margin-left-xs 扫码
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
          }
        }
      });
    }
  }
};
</script>
