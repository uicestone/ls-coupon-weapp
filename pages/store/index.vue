<template lang="pug">
  scroll-view
    view.flex.justify-center
      text.margin-top-xl.text-xl 恭喜获得优惠券
    tab-bar.bottom-fixed(redirect)
</template>

<style lang="stylus"></style>

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
      const res = await api.claimCoupons({ openid, couponIds: [1, 2, 3, 5] });
      this.claimCoupons = res.data;
    }
  }
};
</script>
