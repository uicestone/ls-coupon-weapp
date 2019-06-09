<template lang="pug">
  view
    view.text-center
      view.text-xl.text-red.margin-top-xl 请呼叫店员扫码使用
      view.margin-top
        qrcode(ref="qrcode" val="http://www.bilibili.com", :size="200" :onval="false")
</template>


<script>
export default {
  data() {
    return {
      detail: {
        id: 0
      }
    };
  },
  onLoad(data) {
    this.detail = data;
    this.$refs.qrcode._makeCode();
  }
};
</script>
