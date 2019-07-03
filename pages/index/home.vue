<template lang="pug">
  view.page
    view.top.flex.justify-center
      image(mode="aspectFit" :src="require('../../static/bg_home_top.jpg')")
      image.logo(:src="require('../../static/logo.png')")
    swiper.screen-swiper.square-dot.margin(indicator-dots circular autoplay interval='5000' duration='500')
      swiper-item.swiper-item(v-for='(item,index) in swiperList' :key='index')
        image(:src='item.url' mode='aspectFit' )
    view.links.flex.justify-between
      view.link.margin-left(@click="currentTab = '优惠'")
        image(mode="aspectFit" :src="require('../../static/home_btn_shop_list.jpg')")
      view.link.margin-right(@click="currentTab = '我的'")
        image(mode="aspectFit" :src="require('../../static/home_btn_user.jpg')")

</template>

<script>
import { sync } from "vuex-pathify";

import tkiQrcode from "tki-qrcode/components/tki-qrcode/tki-qrcode";

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
      swiperList: [
        {
          id: 0,
          type: "image",
          url:
            "https://ls-coupon.codeispoetry.tech/wp-content/uploads/2019/07/中间Banner.jpg"
        }
      ]
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
    }
  }
};
</script>

<style lang="stylus" scoped>
  .page
    background-color #f0f0f0
    min-height 100vh
  .top
    position relative
    margin-bottom 100upx
    image
      width 750upx
      height 268upx
    image.logo
      width 144upx
      height 144upx
      position absolute
      bottom -72upx
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
