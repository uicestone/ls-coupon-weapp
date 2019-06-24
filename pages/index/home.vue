<template lang="pug">
  view
    swiper.screen-swiper.square-dot(indicator-dots circular autoplay interval='5000' duration='500' style="min-height:850upx")
      swiper-item(v-for='(item,index) in swiperList' :key='index')
        img(:src='item.url' mode='aspectFill' )
    view
      view.cu-list.menu.sm-border.card-menu.margin-top
        view.cu-item.arrow(v-for="(item,index) in actionList" :key="index" @click="handleAction(item)")
          button.content.cu-btn
            text(:class="item.class")
            view.text-grey {{item.name}}
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
            "http://data.5ikfc.com/static/discount/xfy/15/xfy-5ikfc-716_12.jpg"
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

<style lang="stylus"></style>
