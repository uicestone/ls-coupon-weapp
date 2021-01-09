<template lang="pug">
  view.cu-modal.bottom-modal(:class="[auth.showLogin ? 'show':'']")
    view.cu-dialog(style="background:none")
      view(style="display:flex;padding:10upx")
        button.bg-grey.flex-sub(
          @click="$emit('fail'); auth.showLogin = false",
          style="margin-right:10upx"
        ) 暂不登录
        button.bg-red.flex-sub(
          open-type="getUserInfo",
          @getuserinfo="wechatLogin",
          withcredentials="true"
        ) 微信登录
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
