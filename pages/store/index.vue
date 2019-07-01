<template lang="pug">
  view
    view.text-center.padding(v-if="claimedCoupons.length > 0")
      view.margin-top-xl.text-xl 恭喜获得优惠券
      coupon-item(v-for="(item,index) in claimedCoupons" :key="index" :item="item")
    view.flex.align-center.justify-center.no-coupon(v-else)
      image(mode="aspectFit" :src="require('../../static/no_coupon.jpg')")
    tab-bar.bottom-fixed(redirect)
</template>

<script>
import * as api from "../../common/vmeitime-http";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      id: null,
      claimedCoupons: []
    };
  },
  onLoad(data) {
    this.id = data.id;
    this.initStoreDetail();
  },
  computed: {
    user: sync("auth/user"),
    store: sync("store")
  },
  methods: {
    initStoreDetail() {
      this.claimCoupons();
    },
    async claimCoupons() {
      const { openid } = this.user;
      const couponIds = this.store.currentStore.validCoupons.map(i => i.id);
      if (couponIds.length > 0) {
        const res = await api.claimCoupons({
          openid,
          couponIds,
          customerNickname: this.user.nickName
        });
        this.claimedCoupons = res.data;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .no-coupon
    height 70vh
    image
      width 300upx
</style>

