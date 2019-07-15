<template lang="pug">
  view
    login
    home(v-if="currentTab==='首页'")
    store-list(v-if="currentTab==='优惠'")
    user-index(v-if="currentTab==='我的'")
    store-manage(v-if="currentTab==='管理'")
    tab-bar.bottom-fixed
</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin } from "../../services";
import login from "../login";

export default {
  components: {
    login
  },
  computed: {
    currentTab: sync("currentTab"),
    user: sync("auth/user"),
    auth: sync("auth")
  },
  async onLoad(params) {
    try {
      const data = await wechatLogin();
      if (params.shop) {
        uni.navigateTo({ url: `/pages/store/index?id=${params.shop}` });
      }
      if (params.coupon) {
        uni.navigateTo({ url: `/pages/store/index?coupon=${params.coupon}` });
      }
    } catch (error) {
      console.error(error);
      this.auth.showLogin = true;
    }
  }
};
</script>
