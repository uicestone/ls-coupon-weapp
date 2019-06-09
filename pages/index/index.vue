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
export default {
  computed: {
    currentTab: sync("currentTab")
  }
};
</script>
