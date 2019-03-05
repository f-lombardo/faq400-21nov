<template>
  <p>
    FLD {{ this.component.options[this.name].default.type }}
    <template v-if="this.component.options[this.name].default.showSubmit">
      <button>Button</button>
    </template>
  </p>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue'; // @ is an alias to /src

@Component
export default class FLD extends BasicComponent {
  protected name = 'FLD';
}
</script>