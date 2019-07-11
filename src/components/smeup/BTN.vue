<template>
  <kup-btn
    :buttons.prop="this.component.data"
    :config.prop="getOptions()"
    @kupButtonClicked="onClick($event)"
  ></kup-btn>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import Dynamism from "@/classes/Dynamism";

@Component
export default class BTN extends BasicComponent {
  protected name = "BTN";

  private onClick($event: CustomEvent): void {
    const dynamisms = [
      ...this.getDynamisms("click")
      //TODO ...this.getDynamisms("dblclick")
    ];
    var dynamism: Dynamism = new Dynamism("click");
    if (dynamisms.length > 0) {
      // TODO sistemare per quando si hanno più dinamismi
      dynamisms.forEach(d => {
        dynamism = this.createDynamism(d, $event);
      });
    } else {
      // if there aren't dynamisms then check the single button's exec
      const exec = this.component.data[$event.detail.id].exec;
      if (exec) {
        dynamism.exec = exec;
        dynamism = this.createDynamism(dynamism, $event);
      }
    }
    this.$dynamismManager.execute(this, dynamism);
  }

  private createDynamism(d: Dynamism, $event: CustomEvent): Dynamism {
    const dynamism = new Dynamism(d.event);
    dynamism.source = this.component;
    dynamism.targets = d.targets;
    dynamism.exec = d.exec;

    // adding implicit variables
    dynamism.addImplictVariable({ key: "T1", value: "" });
    dynamism.addImplictVariable({ key: "P1", value: "" });
    dynamism.addImplictVariable({
      key: "K1",
      value: this.component.data[$event.detail.id].value // TODO Gestione Variable Manager
    });
    return dynamism;
  }
}

// VSCode Debug
//# sourceURL=settings.vue
</script>
