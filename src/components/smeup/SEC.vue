<template>
  <div
    :style="sectionStyle"
    class="section">
    <component
      v-for="comp in component.components"
      :key="comp.id"
      :is="getType(comp)"
      :component="comp"
    />
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

  private sectionStyle(): object {
    return {
      flexDirection: this.component.layout ? this.component.layout : "column"
    };
  }
}
</script>

<style lang="scss">
// Style of a single section
.section {
  display: flex;

  > * {
    width: 100%;
  }
}
</style>
