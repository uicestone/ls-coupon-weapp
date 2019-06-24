<template lang="pug">
  view
    view.padding
      coupon-item.margin-top(:item="detail" :showDetail="false")
        qrcode(slot="qrcode" ref="qrcode" :val="detail.codeString", :size="200" :showLoading="true" loadingText="loading" :onval="true")
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

<style lang="stylus"></style>

