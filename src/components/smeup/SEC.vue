<template>
  <div class="section">
    <template v-if="hasSections()">
      <div :class="sectionClass">
        <SEC v-for="s in section.sections" :key="s.id" :section="s"></SEC>
      </div>
    </template>

    <template v-else-if="hasComponents()">
      <template v-if="section.components.length > 1">
        <!-- When layout uses accordion (ExpansionPanel) - The expand property allows more than one open panel at time -->
        <v-expansion-panel
          v-if="section.layout === 'accordion'"
          v-model="panelIndexModel"
          expand
        >
          <v-expansion-panel-content
            v-for="comp in section.components"
            :key="comp.id"
          >
            <template v-slot:header>
              <div>Section: {{ section.id }}</div>
            </template>
            <component :key="comp.id" :is="getType(comp)" :component="comp" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- layout: other than accordion -->
        <template v-else>
          <!-- Tabs -->
          <v-tabs
            v-model="tabIndexModel"
            class="full-width"
            fixed-tabs
            slider-color="rgb(78, 144, 143)"
          >
            <v-tab v-for="comp in section.components" :key="comp.id">{{
              comp.title
            }}</v-tab>
          </v-tabs>
          <!-- Items which get switched by the above tabs -->
          <v-tabs-items v-model="tabIndexModel">
            <v-tab-item v-for="comp in section.components" :key="comp.id">
              <component :is="getType(comp)" :component="comp" />
            </v-tab-item>
          </v-tabs-items>
        </template>
      </template>

      <!-- When there is only a component to show -->
      <component
        v-else
        :is="getType(section.components[0])"
        :component="section.components[0]"
      />
    </template>

    <!-- When there are no components which can be switched -->
    <h4 v-else>Non ci sono componenti in questa scheda</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface Section {
  layout?: string;
  size?: string;
  sections?: Section[];
  components?: any[];
}

@Component
export default class SEC extends Vue {
  protected name = "SEC";

  protected tabIndexModel: string | null = null;

  @Prop() protected section!: Section;

  /**
   * Since it's a tab, always has an item selected, in this case the first one
   * @see https://vuetifyjs.com/en/components/expansion-panels#expansion-panel property value of v-expansion-panel
   */
  private panelIndexModel: boolean[] = [];

  mounted() {
    // TODO when implementing history state restorer, this method must not be called.
    // Otherwise it will overwrite the state restored by the mixin.
    this.setLoadedPanel();
  }

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
      case "CHA":
        return "CHA";
      default:
        return "UNK";
    }
  }

  get sectionClass() {
    if (!this.section) {
      return null;
    }

    return {
      section: true,
      row: "row" == this.section.layout
    };
  }

  private hasSections(): boolean {
    return (
      !!this.section &&
      !!this.section.sections &&
      this.section.sections.length > 0
    );
  }

  private hasComponents(): boolean {
    return (
      !!this.section &&
      !!this.section.components &&
      this.section.components.length > 0
    );
  }

  /*
   * When a section has layout set to accordion, constructs initial array of values for the panels.
   * Checks if the first element is already loaded, which means it must be also be open.
   */
  private setLoadedPanel() {
    const arr = [];
    if (this.section.layout === "accordion") {
      if (this.hasComponents()) {
        const firstComponent = this.section.components![0];
        // If first panel must be open, set first element to true
        if (firstComponent && firstComponent.loaded) {
          arr.push(true);
        }
        for (let i = arr.length; i < this.section.components!.length; i++) {
          arr.push(false);
        }
      }
    }
    this.panelIndexModel = arr;
  }
}
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;

  &.row {
    flex-direction: row;
  }
}
</style>
