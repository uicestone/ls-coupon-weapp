<template lang="pug">
  view.flex.margin-top.bg-white.radius.shadow
    view.flex
      image.thumbnail(:src="item.coupon.thumbnailUrl" mode="aspectFill")
    view.flex-sub.flex.flex-direction.justify-between.padding-sm.padding-bottom-xs
      view.margin-right.flex.justify-start(style="white-space:pre-line") {{item.coupon.desc}}
      view.flex.justify-end
        button.cu-btn.block.text-white.bg-red.btn-show-detail(@click="goCouponDetail(item)" :disabled="item.used" v-if="showDetail" style="width:200upx") 
          text.text-df(v-if="!item.used") 查看详情
          text.text-white(v-else) 已使用
          image(mode="aspectFill" :src="buttonBg")
      view
        view.flex.justify-end
          text.text-grey.text-xs 适用{{item.coupon.allShops?'所有自营':'部分'}}门店
        view.flex.justify-end(v-if="item.coupon.validFrom && item.coupon.validTill")
          text.text-grey.text-xs 有效期：{{ item.coupon.validFrom }} ~ {{ item.coupon.validTill }}
</template>

<script>
import buttonBg from "../static/bg_coupon_btn.jpg";

export default {
  props: {
    showDetail: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: {
        id: null,
        codeString: "-",
        coupon: {
          shops: []
        }
      }
    }
  },
  data() {
    return {
      buttonBg
    };
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
  width 225upx
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


