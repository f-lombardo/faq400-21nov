<template>
  <div v-if="this.component && this.component.loaded">
    <div style="display:flex;">
      <h2 style="float:left">{{ this.component.title }}</h2>
      <div style="float:left">&nbsp;&nbsp;&nbsp;</div>
      <kup-button
        style="float:right"
        label="REFRESH"
        showtext="true"
        flat="true"
        @kupButtonClicked="_onClickRefresh($event)"
      ></kup-button>
    </div>

    <kup-data-table
      :data.prop="component.data"
      :rowsPerPage.prop="25"
      :columnsWidth.prop="_getColumnsWidth()"
      :sort.prop="_getColumnsSort()"
      @kupCellButtonClicked="_onRowClicked($event)"
    ></kup-data-table>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BasicComponent from "@/components/Basic.vue"; // @ is an alias to /src
import Fun from "@/classes/Fun";
import FunObject from "@/classes/FunObject";
import Dynamism from "@/classes/Dynamism";

@Component
export default class MAT extends BasicComponent {
  protected name = "MAT";

  private _onClickRefresh() {
    this.$emit("onExecFun");
  }

  private _getColumnsWidth() {
    if (this.component.options.columnsWidth) {
      return this.component.options.columnsWidth;
    } else {
      return "[]";
    }
  }

  private _getColumnsSort() {
    if (this.component.options.sort) {
      return this.component.options.sort;
    } else {
      return "[]";
    }
  }

  private _onRowClicked($event: any): void {
    // Verifico se nella stringa sono presenti variabili nella forma [xxxx]
    var stringFun = this.resolveVariableFields(
      $event.detail.cell.obj.k,
      $event.detail.row
    );
    var dynamism: Dynamism = new Dynamism("click");
    dynamism = this.createDynamism(dynamism, stringFun);
    this.$dynamismManager.execute(this, dynamism);
  }

  private resolveVariableFields(fun: string, row: any): string {
    let ok: boolean = true;
    let init = 0;
    let variable = "";
    let num01 = 0;
    let num02 = 0;

    while (ok) {
      variable = "";
      num01 = fun.indexOf("[", init);
      num02 = 0;
      if (num01 != -1) {
        num02 = fun.indexOf("]", num01);
        if (num02 != -1) {
          variable = fun.substring(num01 + 1, num02);
          const value = row.cells[variable];
          if (value) {
            fun = fun.replace("[" + variable + "]", value.value);
          } else {
            // TODO verificare se corretto
            fun = fun.replace("[" + variable + "]", "");
          }
          init = num02;
        }
      } else {
        ok = false;
      }
    }

    // Trasformed Fun
    return fun;
  }

  private createDynamism(d: Dynamism, fun: string): Dynamism {
    const dynamism = new Dynamism(d.event);
    dynamism.source = this.component;
    dynamism.targets = d.targets;
    dynamism.exec = fun;
    return dynamism;
  }
}
</script>
