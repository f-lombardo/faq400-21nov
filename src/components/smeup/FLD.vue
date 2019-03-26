<template>
  <ketchup-fld
    @ketchupComboSelected="onFldChange($event)"
    :data.prop="getData()"
    :json.prop="getOptions()"
  ></ketchup-fld>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import BasicComponent from '@/components/Basic.vue'
import Dynamism from '@/classes/Dynamism'

@Component
export default class FLD extends BasicComponent {
  protected name = 'FLD'

  onFldChange($event: CustomEvent) {
    this.getDynamisms('change').forEach((d) => {
      const dyn = new Dynamism(d.event)
      dyn.source = this.comp
      dyn.targets = d.targets

      // adding implicit variables
      dyn.addImplictVariable({ key: 'T1', value: '' })
      dyn.addImplictVariable({ key: 'P1', value: '' })
      dyn.addImplictVariable({ key: 'K1', value: $event.detail.newValue.value })

      this.$dynamismManager.execute(this, dyn)
    })
  }
}
</script>

