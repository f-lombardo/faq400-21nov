<template>
  <div>
    <template v-for="comp in this.component.components">
      <component
        :key="comp.key"
        :is="getType(comp)"
        :component="comp"
        :data.prop="getData(comp)"
        :json.prop="getOptions(comp)"
      ></component>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SEC extends Vue {
  protected name = 'SEC'

  @Prop() protected component!: any

  public getType(comp: any): string {
    switch (comp.type) {
      case 'FLD':
        return 'FLD'
      case 'BTN':
        return 'ketchup-btn'
      case 'EXD':
        return 'EXD'
      case 'MAT':
        return 'MAT'
      case 'LAB':
        return 'LAB'
      default:
        return 'UNK'
    }
  }

  public getOptions(comp: any): object {
    if (comp.options) {
      return comp.options[comp.type].default
    }
    return {}
  }

  public getData(comp: any): object {
    if (comp.data) {
      return comp.data
    }
    return {}
  }
}
</script>