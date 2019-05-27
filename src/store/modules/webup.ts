import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import BasicComponent from "@/interfaces/BasicComponent";

import { defaultSections, prv123, prv456 } from "@/mocks/script";

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

  /**
   * Sets a new root for the component used in Main.vue component.
   * @namespace SET_ROOT
   * @param root - The new root component to set
   */
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

  /**
   * FIXME this mutation is pontatially dangerous
   * Use see comp link below for more details
   * @namespace RELOAD_COMPONENT
   * @param payload
   * @see reloadComponent
   * @see comp
   */
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

  /**
   * TODO
   * Per come funziona webup, se al dinamismo non è associato nessun target ed è presente il parametro 'exec',
   * allora il target è la scheda globale.
   * In quel caso è necessario invocare la mutation SET_ROOT.
   * Questa action va aggiornata di conseguenza.
   *
   * @namespace reloadComponent
   * @param payload
   * @see RELOAD_COMPONENT
   * @see SET_ROOT
   */
  @Action({ commit: "RELOAD_COMPONENT" })
  reloadComponent(payload: { comp: Component; fun: string }) {
    let newExd = [];

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
    let newExd = [];
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
