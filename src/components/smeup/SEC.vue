<template>
  <div>
    <template v-for="component in this.component.components" >
      <wrapper-component 
        :component="component" 
        :key="component.key">
      </wrapper-component>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue';
import wrapperComponent from '@/components/Wrapper.vue';

@Component({
  components: { wrapperComponent }
})
export default class SEC extends BasicComponent {
  protected name = 'SEC';
}
</script>