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
        @kupButtonClicked="_onClickRefresh($event)"
      ></kup-button>
    </div>

    <kup-data-table :data.prop="component.data" @kupCellButtonClicked="_onRowClicked($event)"></kup-data-table>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BasicComponent from "@/components/Basic.vue"; // @ is an alias to /src
import Fun from "@/classes/Fun";
import FunObject from "@/classes/FunObject";

@Component
export default class MAT extends BasicComponent {
  protected name = "MAT";

  private _onClickRefresh() {
    this.$emit("onExecFun");
  }

  private _onRowClicked($event: any): void {
    //    console.log("Test evento", $event);
    //    console.log($event.detail.cell.obj.k);

    // VERIFICO SE NEL PARAMETRO 1 CI SONO VARIABILI [xxxx]
    var funString = $event.detail.cell.obj.k;
    var fun: Fun = new Fun(funString);
    var obj1: FunObject | null = fun.getObject(1);
    if (obj1) {
      if (obj1.getMethod().startsWith("[") && obj1.getMethod().endsWith("]")) {
        var name = obj1.getMethod().replace(/[\[\]']+/g, "");
        var value = $event.detail.row.cells[name].value;
        var replaceFun = $event.detail.cell.obj.k.replace(
          obj1.getMethod(),
          value
        );
        fun = new Fun(replaceFun);
      }
    }
    this.$funManager.execute(fun);
  }
}
</script>
