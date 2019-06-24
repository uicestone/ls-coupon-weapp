import Vue from "vue";
import App from "./App";
import store from "./store";

import tabbar from "./components/tab-bar.vue";
import home from "./pages/index/home.vue";
import storeList from "./pages/store/list.vue";
import storeManage from "./pages/store/manage.vue";
import couponItem from "./components/coupon-item.vue";

import userIndex from "./pages/user/index.vue";
import qrcode from "tki-qrcode";
import uParse from "./components/gaoyia-parse/parse.vue";

Vue.component("u-parse", uParse);
Vue.component("qrcode", qrcode);
Vue.component("tab-bar", tabbar);
Vue.component("home", home);
Vue.component("store-list", storeList);
Vue.component("user-index", userIndex);
Vue.component("store-manage", storeManage);
Vue.component("coupon-item", couponItem);

Vue.config.productionTip = false;

App.mpType = "app";
global.store = store; // for debug

const app = new Vue({
  store,
  ...App
});
app.$mount();
