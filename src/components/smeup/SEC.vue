<template>
  <div>
    <template v-for="comp in this.component.components">
      <component
        :key="comp.id"
        :is="getType(comp)"
        :component="comp"
      ></component>
    </template>
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
