<template lang="pug">
  scroll-view
    view.cu-bar.search.bg-white.padding
      view.text-lg.text-bold {{selectedAddress ||  address}}
    view.cu-bar.search.bg-white
      view.search-form.round
        text.cuIcon-search
        input(v-model="searchText"  @blur="getAddresses" :adjust-position='false' type='text' placeholder='搜索附近地址' confirm-type='search')
      view.action(@click="currentPosition")
        button.cu-btn.shadow-blur.round
          text.cuIcon-focus.text-grey(style="font-size: 40upx")

    view
      view.cu-list.menu.sm-border.card-menu.margin-top
        view.cu-item(v-for="(item,index) in addresses" :key="index" @click="selectAddress(item)")
          view.padding
            view {{item.title}}
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
    selectedPosition: sync("selectedPosition"),
    position: sync("position"),
    selectedAddress: sync("selectedAddress"),
    address: sync("address"),
    addresses: sync("addresses"),
    store: sync("store")
  },
  methods: {
    getAddresses() {
      mapwx.search({
        keyword: this.searchText,
        page_size: 20,
        success: res => {
          this.addresses = res.data;
        },
        fail: err => {
          errorHandler(err);
        }
      });
    },
    selectAddress(item) {
      console.log(item);
      this.selectedAddress = item.title;
      this.selectedPosition = {
        latitude: item.location.lat,
        longitude: item.location.lng
      };
      uni.navigateBack({
        delta: 1
      });
    },
    currentPosition() {
      this.selectedPosition = this.position;
      this.selectedAddress = this.address;
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="stylus"></style>
