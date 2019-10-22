<template>
  <!-- @ketchupFldChanged -->
  <kup-fld
    @ketchupFldChanged="onFldChange($event)"
    @ketchupFldSubmit="onClick($event)"
    @ketchupFileUploaded="onFileUploaded($event)"
    @ketchupFileRejected="onFileUploaded($event)"
    :data.prop="getData()"
    :config.prop="getOptions()"
  ></kup-fld>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import BasicComponent from "@/components/Basic.vue";
import Dynamism from "@/classes/Dynamism";

import IMessage from "@/interfaces/IMessage";
import Message from "@/classes/Message";
import Vue from "vue";

import "@vaadin/vaadin-upload";

@Component
export default class FLD extends BasicComponent {
  protected name = "FLD";

  private onFldChange($event: CustomEvent) {
    this.getDynamisms("change").forEach(d => {
      const dyn = new Dynamism(d.event);
      dyn.source = this.component.id;
      dyn.targets = d.targets;

      // adding implicit variables
      if ($event.detail.value) {
        dyn.addImplictVariable({ key: "T1", value: "" });
        dyn.addImplictVariable({ key: "P1", value: "" });
        dyn.addImplictVariable({ key: "K1", value: $event.detail.value.value });
      }

      this.$dynamismManager.execute(this, dyn);
    });
  }

  private onClick($event: CustomEvent) {
    this.getDynamisms("click").forEach(d => {
      const dyn = new Dynamism(d.event);
      dyn.source = this.component.id;
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

  private onFileUploaded($event: CustomEvent) {
    console.log("onFileUploaded", $event.detail);
    const msgjson: any = JSON.parse($event.detail);
    console.log("msgJSON", msgjson.messages);
    msgjson.messages.forEach((rawMessage: IMessage) => {
      let message: Message = new Message(rawMessage);
      console.log("message", message);
      Vue.prototype.$messageManager.show(message);
    });
    this.onFldChange($event);
  }
}
</script>
