<template>
  <div v-if="this.component && this.component.loaded">
    <div style="display:flex;">
      <h2 style="float:left">{{ this.component.title }}</h2>
      <div style="float:left">&nbsp;&nbsp;&nbsp;</div>
      <kup-button
        style="float:right"
        label="Refresh"
        icon-class="mdi mdi-refresh"
        show-icon="true"
        rounded="true"
        showtext="false"
        @kupButtonClicked="onClickRefresh($event)"
      ></kup-button>
    </div>

    <kup-data-table :data.prop="component.data"></kup-data-table>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BasicComponent from "@/components/Basic.vue"; // @ is an alias to /src

@Component
export default class MAT extends BasicComponent {
  protected name = "MAT";

  private onClickRefresh() {
    this.$emit("onExecFun");
  }
}
</script>
