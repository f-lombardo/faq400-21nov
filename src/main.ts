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
import DialogManager from "./classes/DialogManager";
import ScriptService from "./classes/services/ScriptService";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.min.css";
import EventBus from "./classes/utils/EventBus";

Vue.use(Vuetify);

Vue.config.productionTip = false;

// script service
Vue.prototype.$scriptManager = new ScriptService(null);
// adding fun manager to Vue
Vue.prototype.$funManager = new FunManager();
// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager();
// messages manager
Vue.prototype.$messageManager = new MessageManager();
Vue.prototype.$dialogManager = new DialogManager();
Vue.prototype.$eventBus = new EventBus();

// axios instance fro config
const axiosConfigInstance = axios.create({
  baseURL: process.env.VUE_APP_SMEUP_CONFIG_URL
});

// initial context
Vue.prototype.$SmeUP = {
  FAQ400Nov21: {
    urls: {
      config: process.env.VUE_APP_SMEUP_CONFIG_URL,
      rest: "http://127.0.0.1:7000/"
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
