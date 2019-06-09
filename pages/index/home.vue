<template lang="pug">
  view
    swiper.screen-swiper.square-dot(indicator-dots circular autoplay interval='5000' duration='500')
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
import { wechatLogin } from "../../services";
import { sync } from "vuex-pathify";

export default {
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
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
        },
        {
          id: 1,
          type: "image",
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg"
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
    },
    dev() {
      // uni.navigateTo({
      //   url: `/pages/user/edit`
      // });
    }
  },
  async mounted() {
    try {
      const data = await wechatLogin();
      this.dev();
    } catch (error) {
      uni.navigateTo({
        url: "/pages/login"
      });
    }
  }
};
</script>

<style lang="stylus"></style>
