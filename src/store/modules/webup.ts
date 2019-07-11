import BasicComponent from "@/interfaces/BasicComponent";

interface Component {
  // VueComponent
  component: BasicComponent; // Component
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
  addComponent(state: any, vueComponent: Component) {
    // add vue component in componentsById
    if (vueComponent.component.id) {
      state.componentsById[vueComponent.component.id] = vueComponent;
    }
  },
  removeComponent(state: any, vueComponent: Component) {
    // remove vue component from componentsById
    if (vueComponent.component.id) {
      delete state.componentsById[vueComponent.component.id];
    }
  },
  reloadComponent(state: any, component: BasicComponent) {
    // reload component
    // TODO ricerco all'interno di state.root il componente per id
    // sostituisco data (o tutto il componente???)
  }
  /*
  replaceComponent(state: any, payload: any) {
    // replace component
    payload.comp.comp = payload.newComp;
  } */
};

const actions = {
  setRoot({ commit }: { commit: any }, root: any) {
    commit("setRoot", root);
  },
  clearState({ commit }: { commit: any }) {
    commit("clearRoot");
  },
  addComponent({ commit }: { commit: any }, vueComponent: Component) {
    commit("addComponent", vueComponent);
  },
  removeComponent({ commit }: { commit: any }, vueComponent: Component) {
    commit("removeComponent", vueComponent);
  },
  reloadComponent({ commit }: { commit: any }, component: Component) {
    commit("reloadComponent", component);
  }
  /*
  replaceComponent(
    { commit }: { commit: any },
    payload: { comp: Component; newComp: any }
  ) {
    commit("replaceComponent", {
      comp: payload.comp,
      newComp: payload.newComp
    });
  }, */
};

const getters = {
  getComponentById(state: any) {
    return (key: string): any => {
      return state.componentsById[key];
    };
  },
  getRoot(state: any) {
    return state.root;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
