<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div
    v-if="comp.loaded"
    class="full-size">
    {{ this.comp.title }}
    <template v-if="comp.sections.length > 1">
      <!-- When layout uses accordion (ExpansionPanel) -->
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
      <!-- layout: other than accordion -->
      <template v-else>
        <!-- Tabs -->
        <v-tabs
          v-model="tabIndexModel"
          class="full-size"
          fixed-tabs
          slider-color="rgb(78, 144, 143)">
          <v-tab
            v-for="section in comp.sections"
            :key="section.id">SEC: {{ section.id }}</v-tab>
        </v-tabs>
        <!-- Items which get switched by the above tabs -->
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
    <!-- When there is only an item to show -->
    <smeup-section
      v-else-if="comp.sections.length === 1"
      :key="comp.sections[0].id"
      :component="comp.sections[0]"/>
  </div>
  <!-- When there are npo items which can be switched -->
  <h4 v-else>Non ci sono Schede in questa sezione</h4>
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
}
</script>

<style lang="scss">
.full-size {
  width: 100%;
}
</style>