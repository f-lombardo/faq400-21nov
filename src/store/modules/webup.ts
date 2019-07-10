import BasicComponent from "@/interfaces/BasicComponent";

interface Component {
  component: BasicComponent;
}

interface ComponentMap {
  [index: string]: Component;
}

const state = {
  root: <Component>{
    component: {
      id: "webup",
      loaded: true,
      variables: {}
    }
  },
  componentsById: <ComponentMap>{}
};

const mutations = {
  clearRoot(state: any) {
    state.root = { component: { id: "webup", loaded: true, variables: {} } };
  },
  setRoot(state: any, root: any) {
    state.root = root;
  },
  addComponent(state: any, comp: Component) {
    if (comp.component.id) {
      state.componentsById[comp.component.id] = comp;
    }
  },
  removeComponent(state: any, comp: Component) {
    if (comp.component.id) {
      delete state.componentsById[comp.component.id];
    }
  },
  reloadComponent(state: any, payload: any) {
    // replace component
    payload.comp.comp = payload.newComp;
  }
};

const actions = {
  clearState({ commit }: { commit: any }) {
    commit("clearRoot");
  },
  addComponent({ commit }: { commit: any }, payload: Component) {
    commit("addComponent", payload);
  },
  removeComponent({ commit }: { commit: any }, comp: Component) {
    commit("removeComponent", comp);
  },
  reloadComponent(
    { commit }: { commit: any },
    payload: { comp: Component; newComp: any }
  ) {
    commit("reloadComponent", { comp: payload.comp, newComp: payload.newComp });
  },
  reloadExd({ commit }: { commit: any }, newExd: any) {
    commit("setRoot", newExd);
  }
};

const getters = {
  getComponentById(state: any) {
    return (key: string): any => {
      return state.componentsById[key];
    };
  },
  mainComponent(state: any) {
    return state.root;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
