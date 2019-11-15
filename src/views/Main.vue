<template>
  <div>
    <component :is="root.type" :component="root" :key="root.id"></component>
    <!-- MESSAGE  -->
    <smeup-message
      :visible="getMessageVisible()"
      :message="getMessage()"
      @onShowFalse="setMessageVisible(false)"
    ></smeup-message>
    <!-- DIALOG  -->
    <smeup-dialog
      :visible="getDialogVisible()"
      :message="getDialogMessage()"
      @onCancel="setDialogVisible(false)"
      @onConfirm="setDialogConfirm()"
    ></smeup-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import smeupMessage from "@/components/Message.vue";
import smeupDialog from "@/components/Dialog.vue";

import Message from "@/classes/Message";

const script = require("@/mocks/Start.json");

@Component({
  components: {
    smeupMessage,
    smeupDialog
  }
})
export default class Main extends Vue {
  public root: any = "";
  public message: Message = new Message(null);
  public messageVisible: boolean = false;
  public dialogMessage: Message = new Message(null);
  public dialogVisible: boolean = false;
  private dialogUnsubFunc: any = null;

  private created() {
    // get script
    /*
    this.$scriptManager
      .getScript("Start")
      .then(script => {
        this.root = script;
      })
      .catch(err => {
        console.log(err);
      });
    */
    this.root = script;
    // save main in store
    this.$store.dispatch("webup/setMain", this);
  }

  public getMessage(): Message {
    return this.message;
  }

  public setMessage(message: Message): void {
    this.message = message;
    this.messageVisible = true;
  }

  public getMessageVisible(): boolean {
    return this.messageVisible;
  }

  public setMessageVisible(visible: boolean) {
    this.messageVisible = visible;
  }

  public getDialogMessage(): Message {
    return this.dialogMessage;
  }

  public setDialogMessage(message: Message, unsubFunc: any): void {
    this.dialogMessage = message;
    this.dialogVisible = true;
    this.dialogUnsubFunc = unsubFunc.unsubscribe.bind(Vue.prototype.$eventBus);
  }

  public getDialogVisible(): boolean {
    return this.dialogVisible;
  }

  public setDialogVisible(visible: boolean) {
    this.dialogVisible = visible;
    if (!visible && this.dialogUnsubFunc) {
      this.dialogUnsubFunc();
    }
  }

  public setDialogConfirm() {
    this.dialogVisible = false;
    Vue.prototype.$eventBus.publish("dialog", null);
    this.dialogUnsubFunc();
  }
}
</script>
