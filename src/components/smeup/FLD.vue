<template>
  <!-- @ketchupFldChanged -->
  <ketchup-fld
    @ketchupFldChanged="onFldChange($event)"
    @ketchupFldSubmit="onClick($event)"
    :data.prop="getData()"
    :config.prop="getOptions()"
  ></ketchup-fld>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import Dynamism from "@/classes/Dynamism";

@Component
export default class FLD extends BasicComponent {
  protected name = "FLD";

  private onFldChange($event: CustomEvent) {
    this.getDynamisms("change").forEach(d => {
      const dyn = new Dynamism(d.event);
      dyn.source = this.comp;
      dyn.targets = d.targets;

      // adding implicit variables
      dyn.addImplictVariable({ key: "T1", value: "" });
      dyn.addImplictVariable({ key: "P1", value: "" });
      dyn.addImplictVariable({ key: "K1", value: $event.detail.value.value });

      this.$dynamismManager.execute(this, dyn);
    });
  }

  private onClick($event: CustomEvent) {
    this.getDynamisms("click").forEach(d => {
      const dyn = new Dynamism(d.event);
      dyn.source = this.comp;
      dyn.targets = d.targets;
      dyn.exec = d.exec;

      // adding implicit variables
      dyn.addImplictVariable({ key: "T1", value: "" });
      dyn.addImplictVariable({ key: "P1", value: "" });
      dyn.addImplictVariable({ key: "K1", value: $event.detail.value.value });
      // dyn.addImplictVariable({ key: "Fu", value: $event.detail.value.exec });

      this.$dynamismManager.execute(this, dyn);
    });
  }
}
</script>
