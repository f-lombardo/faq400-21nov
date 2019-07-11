<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div
    v-if="this.component.loaded"
    :style="sectionStyle"
    class="scheda full-width"
  >
    <!-- {{ this.comp.title }} -->
    <smeup-section
      v-for="section in this.component.sections"
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

  private get sectionStyle(): object {
    return {
      flexDirection: this.component.layout ? this.component.layout : "column"
    };
  }
}
</script>

<style lang="scss">
// Style of a single section
.scheda {
  display: flex;

  > * {
    width: 100%;
  }
}
</style>
