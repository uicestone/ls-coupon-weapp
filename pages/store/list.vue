<template lang="pug">
  view
    view.padding-sm.bg-white(@click="goLocationList" style="height:64upx")
      text.cuIcon-location.padding-right-sm
      text {{selectedAddress || address || '无法获取当前位置'}}
      text.cuIcon-unfold.padding-left-sm(v-if="address || selectedAddress")
    view.cu-bar.search.bg-white
      view.search-form.round
        text.cuIcon-search
        input(v-model="searchText"  :adjust-position='false' type='text' placeholder='搜索门店' confirm-type='search')
      view.action(@click="search")
        button.cu-btn.bg-red.shadow-blur.round 搜索
    view
      view.cu-list.menu.sm-border.card-menu.margin-top(v-if="_store.length || searchText" style="margin-bottom:130upx")
        view.cu-item.padding(v-for="(item,index) in _store" :key="index" @click="selectStore(item)")
          view(style="flex:1")
            image.logo(:src="require('../../static/logo.png')")
          view(style="flex:6") 东方既白{{item.name}}
          view.text-sm.text-grey.flex.adjust-end(v-if="item.distance" style="flex:1") {{item.distance}}km
      view(v-else)
          view.load-progress
            view.load-progress-spinner()
</template>


<script>
import { sync } from "vuex-pathify";
import * as api from "../../common/vmeitime-http";
import { mapwx, errorHandler } from "../../utils";

export default {
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    currentStore: sync("store/currentStore"),
    selectedAddress: sync("selectedAddress"),
    selectedPosition: sync("selectedPosition"),
    position: sync("position"),
    address: sync("address"),
    store: sync("store"),
    _store() {
      if (this.searchText) {
        return this.store.list.filter(i => i.name.includes(this.searchText));
      }
      return this.store.list;
    }
  },
  async mounted() {
    try {
      await this.checkLocation();
    } catch (error) {}
  },
  watch: {
    selectedPosition() {
      this.getStore();
    }
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

          mapwx.reverseGeocoder({
            location: {
              latitude,
              longitude
            },
            coord_type: 1,
            success: res => {
              this.address = res.result.formatted_addresses.recommend;
            },
            fail: error => {
              errorHandler(error);
            }
          });
          this.getStore();
        },
        fail: async err => {
          // uni.showModal({
          //   title: "获取位置失败, 请手动选择您最近的门店",
          //   showCancel: false,
          //   icon: "none"
          // });
          this.getStore();
        }
      });
    },
    async getStore() {
      const position = this.selectedPosition.latitude
        ? this.selectedPosition
        : this.position;
      const res = await api.getNearShop(position);
      this.store.list = res.data;
    },
    goLocationList() {
      if (!this.address && !this.selectedAddress) {
        return;
      }
      uni.navigateTo({ url: "/pages/address/list" });
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
