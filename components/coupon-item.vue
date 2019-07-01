<template lang="pug">
  view.flex.margin-top.bg-white.radius.shadow
    view.flex
      image.thumbnail(:src="item.coupon.thumbnailUrl" mode="aspectFill")
    view.flex-sub.flex.flex-direction.justify-between.padding-sm.padding-bottom-xs
      view.margin-right(style="white-space:pre-line") {{item.coupon.desc}}
      view.flex.justify-end
        button.cu-btn.block.text-white.btn-show-detail(@click="goCouponDetail(item)" :disabled="item.used" v-if="showDetail" style="width:200upx") 
          text.text-df 查看详情
          image(mode="aspectFill" :src="require('../static/bg_coupon_btn.jpg')")
      view.flex.justify-end(v-if="item.coupon.validFrom && item.coupon.validTill")
        text.text-grey.text-xs 有效期：{{ item.coupon.validFrom }} ~ {{ item.coupon.validTill }}
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
  width 225upx;
  height 225upx
.btn-show-detail
  position relative
  image
    position absolute
    width 100%
    height 100%
    z-index -1
    border-radius 15upx
    overflow hidden
</style>


