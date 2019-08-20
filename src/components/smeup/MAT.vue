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

    <kup-data-table
      :data.prop="component.data"
      :columnsWidth.prop="_getColumnsWidth()"
      @kupCellButtonClicked="_onRowClicked($event)"
    ></kup-data-table>
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

  private _getColumnsWidth() {
    if (this.component.options.EXB) {
      return this.component.options.EXB.default.columnsWidth;
    } else {
      return {};
    }
  }

  private _onRowClicked($event: any): void {
    // Verifico se nella stringa sono presenti vaariabili nella forma [xxxx]
    var fun: Fun = new Fun(
      this.resolveVariableFields($event.detail.cell.obj.k, $event.detail.row)
    );
    this.$funManager.execute(fun);
  }

  private resolveVariableFields(fun: string, row: any): string {
    //    alert("Original Fun: " + fun);
    var ok: boolean = true;
    var init = 0;
    var variable = "";
    var num01 = 0;
    var num02 = 0;

    while (ok) {
      //      alert(init);
      variable = "";
      num01 = fun.indexOf("[", init);
      num02 = 0;
      if (num01 != -1) {
        num02 = fun.indexOf("]", num01);
        if (num02 != -1) {
          variable = fun.substring(num01 + 1, num02);
          const value = row.cells[variable];
          if (value) {
            //            alert(value.value);
            fun = fun.replace("[" + variable + "]", value.value);
          } else {
            // verificare se corretto
            fun = fun.replace("[" + variable + "]", "");
          }
          init = num02;
        }
      } else {
        ok = false;
      }
    }

    //    alert("Trasformed Fun: " + fun);
    return fun;
  }
}
</script>
