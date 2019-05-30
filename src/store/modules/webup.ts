import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import BasicComponent from "@/interfaces/BasicComponent";

interface Component {
  component: BasicComponent;
}

interface ComponentMap {
  [index: string]: Component;
}

@Module({
  namespaced: true
})
export default class Webup extends VuexModule {
  root: Component = {
    component: {
      key: "webup",
      loaded: true,
      variables: {}
    }
  };

  componentsById: ComponentMap = {};

  @Mutation
  SET_ROOT(root: any) {
    this.root = root;
  }

  @Mutation
  ADD_COMPONENT(comp: Component) {
    if (comp.component.id) {
      this.componentsById[comp.component.id] = comp;
    }
  }

  @Mutation
  REMOVE_COMPONENT(comp: Component) {
    if (comp.component.id) {
      delete this.componentsById[comp.component.id];
    }
  }

  @Mutation
  RELOAD_COMPONENT(payload: any) {
    // replace component
    payload.comp.comp = payload.newComp;
  }

  @Action({ commit: "ADD_COMPONENT" })
  addComponent(payload: Component) {
    return payload;
  }

  @Action({ commit: "REMOVE_COMPONENT" })
  removeComponent(comp: Component) {
    return comp;
  }

  @Action({ commit: "RELOAD_COMPONENT" })
  reloadComponent(payload: { comp: Component; newComp: any }) {
    return { comp: payload.comp, newComp: payload.newComp };
  }

  @Action({ commit: "SET_ROOT" })
  reloadExd(newExd: any) {
    return newExd;
  }

  get getComponentById() {
    return (key: string): any => {
      return this.componentsById[key];
    };
  }

  get mainComponent(): Component {
    return this.root;
  }
}
