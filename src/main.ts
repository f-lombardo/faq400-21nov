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
import MessageManager from "./classes/MessageManager";
import ScriptService from "./classes/services/ScriptService";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.min.css";

Vue.use(Vuetify);

Vue.config.productionTip = false;

// axios.defaults.baseURL = "https://webuptest.smeup.com/gtw";

// script service
Vue.prototype.$scriptManager = new ScriptService("");
// adding fun manager to Vue
Vue.prototype.$funManager = new FunManager();
// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager();
// messages manager
Vue.prototype.$messageManager = new MessageManager();

// axios instance fro config
var axiosConfigInstance = axios.create({
  baseURL: process.env.VUE_APP_SMEUP_CONFIG_URL
});

// initial context
Vue.prototype.$SmeUP = {
  GTWFrontend: {
    urls: {
      config: process.env.VUE_APP_SMEUP_CONFIG_URL,
      rest: ""
    }
  },
  // axios instance for REST calls
  axiosInstance: axios,
  axiosConfigInstance
};

const Instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(Instance);
