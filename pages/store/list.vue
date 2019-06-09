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
export default {
  data() {
    return {
      searchText: "",
      store: {
        list: [
          {
            id: 0,
            name: "光启店"
          },
          {
            id: 1,
            name: "五角场店"
          },
          {
            id: 2,
            name: "星空店"
          }
        ]
      }
    };
  },
  computed: {
    currentStore: sync("store/currentStore")
  },
  async onLoad() {
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
        url: `/pages/store/index`
      });
    },
    checkLocation() {
      uni.getLocation({
        success: async res => {
          console.log(res);
        },
        fail: async err => {
          uni.showModal({
            title: "获取位置失败, 请手动选择您最近的门店",
            showCancel: false,
            icon: "none"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus"></style>
