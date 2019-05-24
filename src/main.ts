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
Vue.use(Vuetify);

Vue.config.productionTip = false;

axios.defaults.baseURL = "TODO";

// adding fun manager to Vue
Vue.prototype.$funManager = new FunManager();
// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
