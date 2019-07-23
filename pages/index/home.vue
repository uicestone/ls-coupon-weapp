<template lang="pug">
  view.page
    home-header
    swiper.screen-swiper.square-dot.margin(indicator-dots circular autoplay interval='5000' duration='500')
      swiper-item.swiper-item(v-for='(item,index) in banners' :key='index' @click="goBannerDetail(item)")
        image(:src='item.imageUrl' mode='aspectFit' )
    view.links.flex.justify-between
      view.link.margin-left(@click="currentTab = '优惠'")
        image(mode="aspectFit" :src="require('../../static/home_btn_shop_list.jpg')")
      view.link.margin-right(@click="currentTab = '我的'")
        image(mode="aspectFit" :src="require('../../static/home_btn_user.jpg')")

</template>

<script>
import { sync } from "vuex-pathify";
import tkiQrcode from "tki-qrcode/components/tki-qrcode/tki-qrcode";
import { getBanners } from "../../common/vmeitime-http";

export default {
  components: {
    tkiQrcode
  },
  data() {
    return {
      actionList: [
        {
          name: "领取优惠",
          class: ".cuIcon-circlefill.text-green",
          action: () => {
            this.currentTab = "优惠";
          }
        },
        {
          name: "我的优惠",
          class: ".cuIcon-my.text-orange",
          action: () => {
            this.currentTab = "我的";
          }
        }
      ],
      banners: []
    };
  },
  computed: {
    currentTab: sync("currentTab")
  },
  methods: {
    async handleAction(item) {
      if (item.action) {
        item.action();
      }
    },
    goBannerDetail(banner) {
      if (banner.shopId) {
        uni.navigateTo({ url: `/pages/store/index?shop=${banner.shopId}` });
      } else if (banner.couponId) {
        uni.navigateTo({ url: `/pages/store/index?coupon=${banner.couponId}` });
      }
    }
  },
  async mounted() {
    this.banners = (await getBanners()).data;
  }
};
</script>

<style lang="stylus" scoped>
.page
  background-color #f0f0f0
  min-height 100vh
.screen-swiper
  border-radius 20upx
  min-height 330upx
  .swiper-item
    height 330upx
    image
      height 330upx
.links
  margin-top 6vh
  .link
    image
      width 326upx
      height 280upx
.bottom
  margin-top 6vh
  margin-bottom 100upx
  image
    width 350upx
    height 250upx
</style>
