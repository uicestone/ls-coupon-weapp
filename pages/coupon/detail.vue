<template lang="pug">
  view
    view.padding
      coupon-item.margin-top(:item="detail" :showDetail="false")
      view.flex.justify-center.margin-top
        view.padding-sm.shadow.bg-white
          qrcode(ref="qrcode" :val="detail.codeString", :size="200" :onval="true")
      view.margin-top.content
        u-parse(:content="detail.coupon.content" className="content")
</template>

<script>
import { sync } from "vuex-pathify";
export default {
  data() {
    return {
      detail: {
        id: null,
        codeString: "placeholder"
      }
    };
  },
  computed: {
    coupons: sync("auth/coupons")
  },
  onLoad(data) {
    const conpon = this.coupons.find(i => i.id == data.id);
    this.detail = conpon;
    this.$refs.qrcode._makeCode();
  }
};
</script>

<style lang="stylus">
._qrCode
  height 200upx
</style>

