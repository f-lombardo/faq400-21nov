import Vue from "vue";
import Vuex from "vuex";

import webup from "@/store/modules/webup";
import user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    webup: {
      namespaced: true,
      modules: {
        webup
      }
    },
    user
  },

  state: {}
});
