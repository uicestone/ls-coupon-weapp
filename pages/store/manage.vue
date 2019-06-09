<template lang="pug">
  view.cu-bar.flex.justify-between.padding-left.bg-white
    text.text-lg 店员端
    view.action(@click="scanQrcode")
      view.cuIcon-scan.text-green
      view.text-green.margin-left-xs 扫码
</template>


<script>
export default {
  methods: {
    scanQrcode() {
      uni.scanCode({
        success: function(res) {
          console.log(res);
        }
      });
    }
  }
};
</script>
