import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import BasicComponent from '@/components/interfaces/BasicComponent'

@Module({
  namespaced: true,
})
export default class Webup extends VuexModule {
  root: BasicComponent = {
    id: '',
    loaded: false,
  }

  componentsByKey = {}

  componentsById = {}

  @Mutation
  SET_ROOT(root: any) {
    this.root = root
  }

  @Mutation
  ADD_COMPONENT(comp: BasicComponent) {
    this.componentsById[comp.id] = comp

    if (comp.key) {
      this.componentsByKey[comp.key] = comp
    }
  }

  @Mutation
  REMOVE_COMPONENT(comp: BasicComponent) {
    delete (this.componentsById as any)[comp.id]

    if (comp.key) {
      delete (this.componentsByKey as any)[comp.key]
    }
  }

  @Mutation
  RELOAD_COMPONENT(comp: BasicComponent) {
    comp.loaded = true
  }

  @Action({ commit: 'ADD_COMPONENT' })
  addComponent(payload: BasicComponent) {
    return payload
  }

  @Action({ commit: 'REMOVE_COMPONENT' })
  removeComponent(comp: BasicComponent) {
    return comp
  }

  get getComponentById() {
    return (key: string): any => {
      return (this.componentsById as any)[key]
    }
  }

  get mainComponent(): BasicComponent {
    return this.root
  }
}
