import Vue from "vue";
import Vuex from "vuex";

import webup from '@/store/modules/webup'
//import StateRestorer from './modules/StateRestorer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    //StateRestorer,
    webup
  },

  state: {}
});
