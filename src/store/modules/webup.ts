export const namespaced = true

interface Webup {
  root: any
}

export const state: Webup = {
  root: {},
}

export const getters = {
  mainComponent: (state: Webup) => state.root,
}

export const mutations = {
  SET_ROOT(state: Webup, root: any) {
    state.root = root
  },
}
