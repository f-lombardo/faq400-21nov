<template>
  <kup-chart
    :width.prop="1000"
    :data.prop="_getData()"
    :axis.prop="_getAxis()"
    :series.prop="_getSeries()"
    :types.prop="_getTypes()"
    @kupChartClicked="_onChartClicked($event)"
  ></kup-chart>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import Dynamism from "@/classes/Dynamism";

@Component
export default class CHA extends BasicComponent {
  protected name = "CHA";

  private _onRowClicked($event: any): void {}

  private _getData() {
    //    alert(JSON.stringify(this.component.data));
    return this.component.data;
  }

  private _getAxis() {
    if (this.component.options.axis) {
      // alert("Axis " + this.component.options.axis);
      return this.component.options.axis;
    } else {
      return "";
    }
  }

  private _getSeries() {
    if (this.component.options.series) {
      //      alert("Series " + this.component.options.series);
      return this.component.options.series;
    } else {
      return "[]";
    }
  }

  private _getTypes() {
    if (this.component.options.types) {
      //      alert("Types " + this.component.options.types);
      return this.component.options.types;
    } else {
      return "[]";
    }
  }
}
</script>
