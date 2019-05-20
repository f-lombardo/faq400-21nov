import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import Vuetify from "vuetify";

import "./registerServiceWorker";
import "./smeupComponents";

import DynamismManager from "./classes/DynamismManager";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
Vue.use(Vuetify);

Vue.config.productionTip = false;

axios.defaults.baseURL = "TODO";

// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager();

const Instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(Instance);