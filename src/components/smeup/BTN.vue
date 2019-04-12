<template>
  <ketchup-button :label="this.component.data[0].value"
    @ketchupButtonClicked="onClick($event)"
  ></ketchup-button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import BasicComponent from '@/components/Basic.vue'
import Dynamism from '@/classes/Dynamism'

@Component
export default class BTN extends BasicComponent {
  protected name = 'BTN'

  private onClick($event: CustomEvent) {
    this.getDynamisms('click').forEach((d) => {
      const dyn = new Dynamism(d.event)
      dyn.source = this.comp
      dyn.targets = d.targets
      dyn.exec = d.exec
      this.$dynamismManager.execute(this, dyn)
    })
  }

}
</script>

