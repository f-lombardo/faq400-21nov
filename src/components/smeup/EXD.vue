<template>
  <div :style="getStyle()" v-if="comp.loaded">
    {{ this.comp.title }}
    <smeup-section
      v-for="section in comp.sections"
      :key="section.id"
      :component="section"
      />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import smeupSection from "@/components/smeup/SEC.vue";

@Component({
  components: { smeupSection }
})
export default class EXD extends BasicComponent {
  protected name: string = "EXD";

  mounted() {
    console.log(this.comp, this.comp.sections);
  }

  private getStyle(): object {
    return {
      display: "flex",
      flexDirection: this.comp.layout
    };
  }
}
</script>
