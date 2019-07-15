<template lang="pug">
  view
    login(@success="resolveWechatLogin" @fail="rejectWechatLogin")
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
  data() {
    return {
      resolveWechatLogin: null,
      rejectWechatLogin: null
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    user: sync("auth/user"),
    auth: sync("auth")
  },
  async onLoad(params) {
    const data = await this.wechatLogin();
    if (params.shop) {
      uni.navigateTo({ url: `/pages/store/index?id=${params.shop}` });
    }
    if (params.coupon) {
      uni.navigateTo({ url: `/pages/store/index?coupon=${params.coupon}` });
    }
  },
  methods: {
    async wechatLogin() {
      try {
        return await wechatLogin();
      } catch (err) {
        console.warn(err);
        this.auth.showLogin = true;
        return new Promise((resolve, reject) => {
          this.resolveWechatLogin = resolve;
          this.rejectWechatLogin = reject;
        });
      }
    }
  }
};
</script>
