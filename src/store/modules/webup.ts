import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import BasicComponent from '@/interfaces/BasicComponent'

interface Component {
  component: BasicComponent
}

interface ComponentMap {
  [index: string]: Component
}

@Module({
  namespaced: true,
})
export default class Webup extends VuexModule {
  root: Component = {
    component: {
      key: 'webup',
      loaded: true,
      variables: {},
    },
  }

  componentsByKey: ComponentMap = {}

  componentsById: ComponentMap = {}

  @Mutation
  SET_ROOT(root: any) {
    this.root = root
  }

  @Mutation
  ADD_COMPONENT(comp: Component) {
    this.componentsByKey[comp.component.key] = comp

    if (comp.component.id) {
      this.componentsById[comp.component.id] = comp
    }
  }

  @Mutation
  REMOVE_COMPONENT(comp: Component) {
    delete this.componentsByKey[comp.component.key]

    if (comp.component.id) {
      delete this.componentsById[comp.component.id]
    }
  }

  @Mutation
  RELOAD_COMPONENT(comp: Component) {
    comp.component.loaded = true
  }

  @Action({ commit: 'ADD_COMPONENT' })
  addComponent(payload: Component) {
    return payload
  }

  @Action({ commit: 'REMOVE_COMPONENT' })
  removeComponent(comp: Component) {
    return comp
  }

  @Action({ commit: 'RELOAD_COMPONENT' })
  reloadComponent(comp: Component) {
    // TODO questo dovrebbe controllare la fun, chiamare API facendosi dare i nuovi dati etc
    comp.component.loaded = true

    return comp
  }

  get getComponentById() {
    return (key: string): any => {
      return this.componentsById[key]
    }
  }

  get mainComponent(): Component {
    return this.root
  }
}
