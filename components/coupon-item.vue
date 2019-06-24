<template lang="pug">
  view.flex.margin-top.bg-white.padding.radius.shadow.justify-between.align-center
    view.margin-right(style="flex:8") {{item.coupon.desc}}
    view(style="flex:1")
      button.cu-btn.round.bg-red.sm(@click="goCouponDetail(item)" :disabled="item.used" style="width: 100upx") 
        text.text-df 使用
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goCouponDetail(item) {
      uni.navigateTo({
        url: `/pages/coupon/detail?id=${item.id}`
      });
    }
  }
};
</script>
