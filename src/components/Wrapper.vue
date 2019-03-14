<template>
  <div>
    <component 
      :is="this.getType()" 
      :data.prop="this.component.data" 
      :json.prop="this.getOptions()">
    </component>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue';

@Component
export default class Wrapper extends BasicComponent {

  private type: string = this.component.type;

  public getType(): string {
    switch (this.type) {
      case 'FLD':
        return 'ketchup-fld';
      case 'BTN':
        return 'ketchup-btn';
      case 'EXD':
        return 'exd'; // TODO
      default:
        return 'ketchup-fld';
    }
  }

  public getOptions(): object {
    return this.component.options[this.type].default;
  }

}
</script>