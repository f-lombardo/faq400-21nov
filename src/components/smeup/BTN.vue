<template>
  <ketchup-btn
    :buttons.prop="this.component.data"
    :config.prop="getOptions()"
    @ketchupButtonClicked="onClick($event)"
  ></ketchup-btn>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import Dynamism from "@/classes/Dynamism";

@Component
export default class BTN extends BasicComponent {
  protected name = "BTN";

  private onClick($event: CustomEvent) {
    this.getDynamisms("click").forEach(d => {
      const dyn = new Dynamism(d.event);
      dyn.source = this.comp;
      dyn.targets = d.targets;
      dyn.exec = d.exec;

      // adding implicit variables
      dyn.addImplictVariable({ key: "T1", value: "" });
      dyn.addImplictVariable({ key: "P1", value: "" });
      dyn.addImplictVariable({
        key: "K1",
        value: this.component.data[$event.detail.id].value
      });

      this.$dynamismManager.execute(this, dyn);
    });
  }
}
</script>
