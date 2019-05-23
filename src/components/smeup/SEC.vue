<template>
  <div class="full-width">
    <template v-if="component.components.length > 1">
      <!-- When layout uses accordion (ExpansionPanel) -->
      <v-expansion-panel v-if="component.layout === 'accordion'">
        <v-expansion-panel-content
          v-for="comp in component.components"
          :key="comp.id"
        >
          <template v-slot:header>
            <div>Section: {{ component.id }}</div>
          </template>
          <component
            :is="getType(comp)"
            :component="comp"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- layout: other than accordion -->
      <template v-else>
        <!-- Tabs -->
        <v-tabs
          v-model="tabIndexModel"
          class="full-width"
          fixed-tabs
          slider-color="rgb(78, 144, 143)">
          <v-tab
            v-for="comp in component.components"
            :key="comp.id"
            >SEC: {{ comp.id }}</v-tab>
        </v-tabs>
        <!-- Items which get switched by the above tabs -->
        <v-tabs-items v-model="tabIndexModel">
          <v-tab-item
            v-for="comp in component.components"
            :key="comp.id"
          >
            <component
              :is="getType(comp)"
              :component="comp"/>
          </v-tab-item>
        </v-tabs-items>
      </template>
    </template>
    <!-- When there is only a component to show -->
    <component
      v-else-if="component.components.length === 1"
      :is="getType(component.components[0])"
      :component="component.components[0]"/>
    <!-- When there are no components which can be switched -->
    <h4 v-else>Non ci sono componenti in questa scheda</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SEC extends Vue {
  protected name = "SEC";

  @Prop() protected component!: any;

  public getType(comp: any): string {
    switch (comp.type) {
      case "FLD":
        return "FLD";
      case "BTN":
        return "BTN";
      case "EXD":
        return "EXD";
      case "MAT":
        return "MAT";
      case "EXB":
        return "MAT";
      case "LAB":
        return "LAB";
      default:
        return "UNK";
    }
  }
}
</script>
