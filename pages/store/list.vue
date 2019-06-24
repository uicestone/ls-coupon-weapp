<template lang="pug">
  scroll-view
    view.cu-bar.search.bg-white
      view.search-form.round
        text.cuIcon-search
        input(v-model="searchText"  :adjust-position='false' type='text' placeholder='搜索附近门店' confirm-type='search')
      view.action(@click="search")
        button.cu-btn.bg-green.shadow-blur.round 搜索
    view
      view.cu-list.menu.sm-border.card-menu.margin-top
        view.cu-item.padding(v-for="(item,index) in _store.list" :key="index" @click="selectStore(item)")
          view(style="flex:1")
            image.logo(:src="require('../../static/logo.png')")
          view(style="flex:6") 小肥羊{{item.name}}
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
    store: sync("store"),
    _store() {
      if (this.searchText) {
        return this.store.list.filter(i => i.name.includes(this.searchText));
      }
      return this.store;
    }
  },
  async mounted() {
    try {
      await this.checkLocation();
    } catch (error) {}
  },
  methods: {
    search() {
      this.searchText = "";
    },
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

<style lang="stylus">
.logo
  width 60upx
  height 60upx
  object-fit contain
</style>
