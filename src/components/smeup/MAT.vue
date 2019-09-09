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
      :rowsPerPage.prop="50"
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
    // TODO qui va creato un dinamismo

    // Verifico se nella stringa sono presenti variabili nella forma [xxxx]
    var fun: Fun = new Fun(
      this.resolveVariableFields($event.detail.cell.obj.k, $event.detail.row)
    );
    const sleep = (milliseconds: number) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    // TODO Refactor. Non va bene la ripetizione qui. DRY
    this.$funManager.execute(fun).then(() => {
      if (fun.getNotify()) {
        const notifyVueComponent = this.$store.getters[
          "webup/getComponentById"
        ](fun.getNotify());
        // TODO togliere la sleep quando verrà gestito "refresh" in options
        if (notifyVueComponent && notifyVueComponent.hasFun()) {
          sleep(5000).then(() => {
            notifyVueComponent.$emit("onExecFun");
          });
        }
      }
    });
  }

  private resolveVariableFields(fun: string, row: any): string {
    // console.log("Original Fun: " + fun);
    var ok: boolean = true;
    var init = 0;
    var variable = "";
    var num01 = 0;
    var num02 = 0;

    while (ok) {
      // console.log(init);
      variable = "";
      num01 = fun.indexOf("[", init);
      num02 = 0;
      if (num01 != -1) {
        num02 = fun.indexOf("]", num01);
        if (num02 != -1) {
          variable = fun.substring(num01 + 1, num02);
          const value = row.cells[variable];
          if (value) {
            // console.log(value.value);
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

    // console.log("Trasformed Fun: " + fun);
    return fun;
  }
}
</script>
