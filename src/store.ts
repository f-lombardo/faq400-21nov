import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    components: {} as any
  },
  mutations: {
    addComponent(state, payload: {[key: string]: any }) {
      state.components[payload.id] = payload.component;
    },
    removeComponent(state, id: string) {
      delete state.components[id];
    },
  },
  actions: {
    addComponent({ commit }, payload) {
      commit('addComponent', payload);
    },
    removeComponent({ commit }, id) {
      commit('removeComponent', id);
    },
  },
});
