import { make } from "vuex-pathify";

const state = {
  nearStore: [],
  currentStore: {
    id: uni.getStorageSync("storeId"),
    avaliableSlots: []
  }
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
};
