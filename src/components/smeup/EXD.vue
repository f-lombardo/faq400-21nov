<template>
  <div :style="getStyle()" v-if="component.loaded">
    {{ this.component.title }}
    <template v-for="section in this.component.sections">
      <smeup-section :component="section" :key="section.key"></smeup-section>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import BasicComponent from '@/components/Basic.vue'
import smeupSection from '@/components/smeup/SEC.vue'

@Component({
  components: { smeupSection },
})
export default class EXD extends BasicComponent {
  protected name: string = 'EXD'

  private getStyle(): object {
    return {
      display: 'flex',
      flexDirection: this.component.layout,
    }
  }
}
</script>