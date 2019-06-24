<template lang="pug">
  view.flex.margin-top.bg-white.radius.shadow
    img.thumbnail(:src="item.coupon.thumbnailUrl")
    view.flex.flex-direction.justify-between.padding-sm
      view.margin-right.text-xl.text-bold {{item.coupon.desc}}
      slot(name="qrcode")
      button.cu-btn.block.bg-red(@click="goCouponDetail(item)" :disabled="item.used" v-if="showDetail") 
        text.text-df 查看详情
</template>

<script>
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: true
    },
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

<style lang="stylus" scoped>
.thumbnail
  width 60%
  height 160px
</style>


