import Vue from 'vue'
import Vuex from 'vuex'
import Dynamism from '../components/interfaces/Dynamism'

import * as webup from '@/store/modules/webup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    webup,
  },

  state: {
    components: {} as any,
  },

  getters: {
    getComponentById: ({ components }) => (id: string) => {
      return components[id]
    },
  },

  mutations: {
    addComponent(state, payload: { [key: string]: any }) {
      state.components[payload.id] = payload.component
    },

    removeComponent(state, id: string) {
      delete state.components[id]
    },

    loadComponent(state, payload) {
      const comp = state.components[payload]

      if (comp) {
        comp.isLoaded = true
        // comp.component.loaded = true
        // comp.component = { ...comp.component, loaded: true }
      }
    },
  },

  actions: {
    addComponent({ commit }, payload) {
      commit('addComponent', payload)
    },
    dynamism({ getters, commit }, payload: Dynamism) {
      if (payload.targets) {
        payload.targets
          .map((target: string) => getters.getComponentById(target))
          .filter((c) => c)
          .forEach((comp) => commit('loadComponent', comp.id))
      }
    },
    removeComponent({ commit }, id) {
      commit('removeComponent', id)
    },
  },
})
