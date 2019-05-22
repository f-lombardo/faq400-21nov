<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div :style="getStyle()" v-if="comp.loaded">
    {{ this.comp.title }}

    <template v-if="comp.sections.length > 1">

      <v-expansion-panel v-if="comp.layout === 'accordion'">
        <v-expansion-panel-content
          v-for="section in comp.sections"
          :key="section.id"
        >
          <template v-slot:header>
            <h6>Section: {{ section.id }}</h6>
          </template>
          <smeup-section :component="section"/>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <template v-else>

        <v-tabs
          v-model="tabIndexModel"
          fixed-tabs
          slider-color="red"
          >
          <v-tab
            v-for="section in comp.sections"
            :key="section.id"
          >SEC: {{ section.id }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabIndexModel">
          <v-tab-item
            v-for="section in comp.sections"
            :key="section.id"
          >
            <smeup-section :component="section"/>
          </v-tab-item>
        </v-tabs-items>

      </template>

    </template>

    <smeup-section
      v-else
      :key="section.id"
      :component="section"/>
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

  protected tabIndexModel: string | null = null;

  private getStyle(): object {
    return {
      display: "flex",
      flexDirection: this.comp.layout
    };
  }
}
</script>
