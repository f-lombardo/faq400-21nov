<template>
  <ketchup-fld :component="component" @ketchupComboSelected="onComboChange($event)"></ketchup-fld>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import BasicComponent from '@/components/Basic.vue'
import Dynamism from '../interfaces/Dynamism'

@Component
export default class FLD extends BasicComponent {
  protected name = 'FLD'

  onComboChange($event: CustomEvent) {
    this.getDynamisms('change').forEach((dyn: Dynamism) => {
      // TODO tutta questa logica sarebbe da spostare in un altro file
      // preparing variables
      const variables = new Array()

      variables.push({
        key: 'T1',
        value: '',
      })

      variables.push({
        key: 'P1',
        value: '',
      })

      variables.push({
        key: 'K1',
        value: $event.detail.newValue.value,
      })

      this.$store.dispatch('dynamism', {
        event: dyn.event,
        targets: dyn.targets,
        variables,
      })
    })
  }
}
</script>

