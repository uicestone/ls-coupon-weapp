<template lang="pug">
  view
    view.cu-bar.tabbar.bg-white
      view.action(v-for="(item,index) in routes" :key="index" @click="handleRouteChange(item)" :class="[currentTab=== item.name ? 'text-green': '']" v-if="checkTab(item)")
        view(:class="item.icon")
        text {{item.name}}
</template>

<script>
import _ from "lodash";
import { sync } from "vuex-pathify";
export default {
  props: ["redirect"],
  data() {
    return {
      routes: [
        {
          icon: ".cuIcon-home ",
          name: "首页"
        },
        {
          icon: ".cuIcon-similar ",
          name: "优惠"
        },
        {
          icon: ".cuIcon-my ",
          name: "我的"
        },
        {
          icon: ".cuIcon-shop",
          name: "管理"
        }
      ]
    };
  },
  computed: {
    currentTab: sync("currentTab"),
    user: sync("auth/user")
  },
  methods: {
    checkTab(item) {
      if (item.name === "管理") {
        if (!this.user.roles) {
          return false;
        }
      }
      if (item.name !== "管理" && this.user.roles) {
        return false;
      }
      return true;
    },
    handleRouteChange(item) {
      this.currentTab = item.name;
      if (this.redirect) {
        uni.navigateBack({
          delta: 5
        });
      }
    }
  },
  mounted() {}
};
</script>
