<template>
  <div :style="getStyle()" v-if="comp.loaded">
    {{ this.comp.title }}

    <v-expansion-panel v-if="comp.layout === 'accordion'">
      <v-expansion-panel-content
        v-for="section in comp.sections"
        :key="section.id"
      >
        <template v-slot:header>
          <div>Section: {{ section.id }}</div>
        </template>
        <smeup-section :component="section"/>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <template v-else>
      <smeup-section
        v-for="section in comp.sections"
        :key="section.id"
        :component="section"/>
    </template>
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

  private getStyle(): object {
    return {
      display: "flex",
      flexDirection: this.comp.layout
    };
  }
}
</script>
