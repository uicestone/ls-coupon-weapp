<template lang="pug">
  view
    home(v-if="currentTab==='首页'")
    store-list(v-if="currentTab==='优惠'")
    user-index(v-if="currentTab==='我的'")
    store-manage(v-if="currentTab==='管理'")
    tab-bar.bottom-fixed
</template>

<script>
import { sync } from "vuex-pathify";
import { wechatLogin } from "../../services";

export default {
  computed: {
    currentTab: sync("currentTab"),
    user: sync("auth/user")
  },
  async onLoad() {
    try {
      const data = await wechatLogin();
      if (this.user.roles) {
        this.currentTab = '管理';
      }
    } catch (error) {
      console.error(error);
      uni.navigateTo({
        url: "/pages/login"
      });
    }
  }
};
</script>
