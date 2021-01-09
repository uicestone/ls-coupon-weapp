<template lang="pug">
  view
    view.padding(style="padding-bottom:0")
      coupon-item.margin-top(:item="detail" :showDetail="false")
      view.flex.justify-center.margin-top
        view.padding-sm.shadow.bg-white
          qrcode(ref="qrcode" :val="detail.codeString", :size="200" :onval="true")
      view.cu-bar.bg-white.margin-top.padding-lr.radius
        text.text-black 本券有效期：{{ detail.coupon.validFrom }} ~ {{ detail.coupon.validTill }}
    view
      view.cu-card.shadow.radius
        view.cu-item.content.padding
          u-parse(:content="detail.coupon.content" className="content")
      view.cu-bar.bg-white.solid-bottom.margin-lr.padding-lr.radius.margin-bottom-xs
        text.text-bold 适用门店
      view.cu-list.menu.sm-border.margin-lr.radius(style="margin-bottom:50upx")
        view.cu-item.padding(v-for="(item,index) in detail.coupon.allShops ? allShops : detail.coupon.shops" :key="index")
          view(style="flex:1")
            image.logo(:src="require('../../static/logo.png')")
          view(style="flex:6") 东方既白{{item.name}}
          view.text-sm.text-grey.flex.adjust-end(v-if="item.distance" style="flex:1") {{item.distance}}km

</template>

<script>
import { sync } from "vuex-pathify";
import { getNearShop } from "../../common/vmeitime-http";
export default {
  data() {
    return {
      detail: {
        id: null,
        codeString: "-",
        coupon: {
          shops: []
        }
      },
      allShops: []
    };
  },
  computed: {
    coupons: sync("auth/coupons"),
    position: sync("position")
  },
  async onLoad(data) {
    const coupon = this.coupons.find(i => i.id == data.id);
    this.detail = coupon;
    if (this.detail.coupon.allShops) {
      this.allShops = (await getNearShop(this.position)).data;
    }
    this.$refs.qrcode._makeCode();
  }
};
</script>

<style lang="stylus">
._qrCode
  height 200upx
</style>

