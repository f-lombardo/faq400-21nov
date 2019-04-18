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

  private onClick($event: CustomEvent): void {
    const clickDynamisms = this.getDynamisms("click");
    const doubleClickDynamisms = this.getDynamisms("dblclick");
    if (clickDynamisms.length > 0 || doubleClickDynamisms.length > 0) {
      clickDynamisms.forEach(d => {
        var dyn: Dynamism = this.createDynamism(d, $event);
        this.$dynamismManager.execute(this, dyn);
      });
      doubleClickDynamisms.forEach(d => {
        var dyn: Dynamism = this.createDynamism(d, $event);
        this.$dynamismManager.execute(this, dyn);
      });
    } else {
      // if there aren't dynamisms, check the single button's exec
      const exec = this.component.data[$event.detail.id].exec;
      if (exec) {
        const d = new Dynamism("click");
        d.exec = exec;
        var dyn: Dynamism = this.createDynamism(d, $event);
        this.$dynamismManager.exec(this, dyn);
      }
    }
  }

  private createDynamism(d: Dynamism, $event: CustomEvent): Dynamism {
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
    return dyn;
  }
}
</script>
