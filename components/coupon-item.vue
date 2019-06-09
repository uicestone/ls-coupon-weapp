<template lang="pug">
  view.cu-bar.margin-top.bg-white.padding-sm.radius.shadow
    view
      text {{item.coupon.desc}}
    view
      button.cu-btn.round.bg-red(@click="goCouponDetail(item)" :disabled="item.used") 
        text 去使用
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
