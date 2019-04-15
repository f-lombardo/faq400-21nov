import Vue from "vue";
import Vuex from "vuex";

import webup from "@/store/modules/webup";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    webup
  },

  state: {}
});
