// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

// for vutify
import vuetify from "./plugins/vuetify.js";

// for vuex
// import { store } from "./store.js";

// router
import router from "./router";

//vue mask
import VueMask from "v-mask";
Vue.use(VueMask);

Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  vuetify,
  router,
  //store,
  el: "#app",
  components: { App },
  template: "<App/>",
  render: h => h(App)
});
