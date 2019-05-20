import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import BasicComponent from "@/interfaces/BasicComponent";

import defaultSections from "@/mocks/sottoscheda1.json";
import prv123 from "@/mocks/sottoscheda2.json";
import prv456 from "@/mocks/sottoscheda3.json";

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
    payload.comp.comp = payload.newExd;
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
  reloadComponent(payload: { comp: Component; fun: string }) {
    let newExd: any = [];

    if (payload.fun.endsWith("PRV123)")) {
      newExd = prv123;
    } else if (payload.fun.endsWith("PRV456)")) {
      newExd = prv456;
    } else {
      newExd = defaultSections;
    }
    return { comp: payload.comp, newExd };
  }

  @Action({ commit: "SET_ROOT" })
  reloadExd(fun: string) {
    let newExd: any = [];
    if (fun.endsWith("PRV123)")) {
      newExd = prv123;
    } else if (fun.endsWith("PRV456)")) {
      newExd = prv456;
    } else {
      newExd = defaultSections;
    }
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
