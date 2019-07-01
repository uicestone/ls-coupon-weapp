<template lang="pug">
  view.flex.margin-top.bg-white.radius.shadow
    view.flex
      image.thumbnail(:src="item.coupon.thumbnailUrl" mode="aspectFill")
    view.flex-sub.flex.flex-direction.justify-between.padding-sm.padding-bottom-xs
      view.margin-right(style="white-space:pre-line") {{item.coupon.desc}}
      view.flex.justify-end
        button.cu-btn.block.bg-green(@click="goCouponDetail(item)" :disabled="item.used" v-if="showDetail" style="width:200upx;background:url('../../static/bg_user_top.jpg') 50% 50%; background-size:500%") 
          text.text-df 查看详情
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
</style>


