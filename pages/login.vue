<template lang="pug">
  view.cu-modal.bottom-modal(:class="[auth.showLogin ? 'show':'']")
    view.cu-dialog
      view.cu-bar.bg-green
        button.bg-green.flex-sub(open-type='getUserInfo', @getuserinfo='wechatLogin', withcredentials='true') 微信登录
 
</template>

<script>
import { wechatLogin } from "../services";
import { sync } from "vuex-pathify";

export default {
  computed: {
    currentTab: sync("currentTab"),
    auth: sync("auth")
  },
  methods: {
    async wechatLogin() {
      try {
        const res = await wechatLogin();
        console.log(res);
        this.$emit("success");
      } catch (err) {
        console.log(err);
        this.$emit("fail");
      }
    }
  }
};
</script>

<style lang="stylus"></style>
