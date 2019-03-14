<template>
  <div>
    <component 
      :is="this.getType()" 
      :component="this.component"
      :data.prop="this.getData()" 
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
        return 'EXD';
      case 'MAT':
        return 'MAT';
      case 'LAB':
        return 'LAB';
      default:
        return 'ketchup-fld';
    }
  }

  public getOptions(): object {
    if (this.component.options) {
      return this.component.options[this.type].default;
    }
    return {};
  }

  public getData(): object {
    if (this.component.data) {
      return this.component.data;
    }
    return {};
  }

}
</script>