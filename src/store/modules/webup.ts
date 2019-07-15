import BasicComponent from "@/interfaces/BasicComponent";

interface Component {
  // VueComponent
  component: BasicComponent; // Component
}

interface ComponentMap {
  [index: string]: Component;
}

const state = {
  main: {
    root: <BasicComponent>{
      id: "webup",
      loaded: true,
      variables: {}
    }
  },
  componentsById: <ComponentMap>{}
};

const mutations = {
  clearRoot(state: any) {
    state.main = {
      root: <BasicComponent>{
        id: "webup",
        loaded: true,
        variables: {}
      }
    };
  },
  setRoot(state: any, root: any) {
    state.main.root = root;
  },
  setMain(state: any, mainComponent: any) {
    state.main = mainComponent;
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
    // copy root
    const rootCopy = { ...state.main.root };
    // reload component
    let component2update = _getComponent(component.id, rootCopy);
    if (component2update) {
      component2update = Object.assign(component2update, component);
    }
    state.main.root = rootCopy;
  },
  reloadDataComponent(state: any, payload: any) {
    // reload data component
    let component2update = _getComponent(payload.id, state.main.root);
    if (component2update) {
      component2update.data = payload.data;
    }
  }
};

const actions = {
  setRoot({ commit }: { commit: any }, root: any) {
    commit("setRoot", root);
  },
  setMain({ commit }: { commit: any }, mainComponent: any) {
    commit("setMain", mainComponent);
  },
  clearRoot({ commit }: { commit: any }) {
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
  },
  reloadDataComponent({ commit }: { commit: any }, payload: any) {
    commit("reloadDataComponent", payload);
  }
};

const getters = {
  getComponentById(state: any) {
    return (key: string): any => {
      return state.componentsById[key];
    };
  },
  getRoot(state: any) {
    return state.main.root;
  }
};

function _getComponent(
  id: string,
  currentNode: BasicComponent
): BasicComponent | null {
  var i, children, currentChild, result;
  if (id == currentNode.id) {
    return currentNode;
  } else {
    children = _getChildren(currentNode);
    for (i = 0; i < children.length; i += 1) {
      currentChild = children[i];
      result = _getComponent(id, currentChild);
      if (result != null) {
        return result;
      }
    }
    return null;
  }
}

const EXD_TYPE: string = "EXD";

function _getChildren(component: BasicComponent): BasicComponent[] {
  var components: BasicComponent[] = [];
  if (component.type === EXD_TYPE) {
    component.sections.forEach((section: any) => {
      components = [...section.components, ...components];
    });
  }
  return components;
}

export default {
  state,
  mutations,
  actions,
  getters
};
