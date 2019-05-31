import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import Vuetify from "vuetify";

import "./registerServiceWorker";
import "./smeupComponents";

import DynamismManager from "./classes/DynamismManager";
import FunManager from "./classes/FunManager";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.min.css";

Vue.use(Vuetify);

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://webuptest.smeup.com/gtw";

// adding fun manager to Vue
Vue.prototype.$funManager = new FunManager();
// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager();

const Instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(Instance);
