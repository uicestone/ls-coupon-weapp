<template lang="pug">
  view
    view.text-center
      view.text-xl.text-red.margin-top-xl 请呼叫店员扫码使用
      view.margin-top
        qrcode( ref="qrcode" :val="detail.codeString", :size="300" :showLoading="true" loadingText="loading" :onval="true")
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
