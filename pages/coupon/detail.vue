<template lang="pug">
  view
    view.flex.justify-center
      text.text-xl.text-red.margin-top-xl 请呼叫店员扫码使用
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
  }
};
</script>
