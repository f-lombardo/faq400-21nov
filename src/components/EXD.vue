<template>
  <div :style="this.getStyle()">
    {{ this.component.title }}
    <template v-for="section in this.component.sections">
      <smeup-section
        :component="section"
        :key="section.key">
      </smeup-section>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BasicComponent from '@/components/Basic.vue'; // @ is an alias to /src
import smeupSection from '@/components/SEC.vue';

@Component({
  components: { smeupSection }
})
export default class EXD extends BasicComponent {
  protected name: string = 'EXD';

  private getStyle(): object {
    return {
      display: 'flex',
      flexDirection: this.component.layout
    };
  }
}
</script>