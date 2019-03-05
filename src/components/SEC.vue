<template>
  <div>
    <template v-for="component in this.component.components" >
      <component
        :key="component.key"
        :is="component.type"
        :component="component">
      </component>  
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue'; // @ is an alias to /src

@Component
export default class SEC extends BasicComponent {
  protected name = 'SEC';
}
</script>