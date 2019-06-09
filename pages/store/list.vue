<template lang="pug">
  scroll-view
    view.cu-bar.search.bg-white
      view.search-form.round
        text.cuIcon-search
        input(v-model="searchText" @blur="searchBlur" :adjust-position='false' type='text' placeholder='搜索附近门店' confirm-type='search')
      view.action
        button.cu-btn.bg-green.shadow-blur.round 搜索
    view
      view.cu-list.menu.sm-border.card-menu.margin-top
        view.cu-item(v-for="(item,index) in store.list" :key="index" @click="selectStore(item)")
          view.padding
            view 小肥羊{{item.name}}
</template>


<script>
import { sync } from "vuex-pathify";
import * as api from "../../common/vmeitime-http";

export default {
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    currentStore: sync("store/currentStore"),
    position: sync("position"),
    store: sync("store")
  },
  async mounted() {
    try {
      await this.checkLocation();
    } catch (error) {}
  },
  methods: {
    searchBlur() {},
    async selectStore(item) {
      uni.setStorage({
        key: "storeId",
        data: item.id
      });
      this.currentStore = { ...this.currentStore, ...item };
      uni.navigateTo({
        url: `/pages/store/index?id=${item.id}`
      });
    },
    checkLocation() {
      uni.getLocation({
        success: async res => {
          const { latitude, longitude } = res;
          this.position = {
            latitude,
            longitude
          };
          this.getStore();
        },
        fail: async err => {
          uni.showModal({
            title: "获取位置失败, 请手动选择您最近的门店",
            showCancel: false,
            icon: "none"
          });
        }
      });
    },
    async getStore() {
      if (!this.position.latitude) return;
      const res = await api.getNearShop(this.position);
      this.store.list = res.data;
    }
  }
};
</script>

<style lang="stylus"></style>
