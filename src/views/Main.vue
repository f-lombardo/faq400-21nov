<template>
  <div>
    <component :is="root.type" :component="root" :key="root.id"></component>
    <!--   -->
    <smeup-message
      :visible="getMessageVisible()"
      :message="getMessage()"
      @onShowFalse="setMessageVisible(false)"
    ></smeup-message>
    <!--   -->
    <smeup-dialog
      :visible="getDialogVisible()"
      :message="getDialogMessage()"
      @onShowFalse="setDialogVisible(false)"
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

  private created() {
    // get script
    this.$scriptManager
      .getScript("Start")
      .then(script => {
        this.root = script;
      })
      .catch(err => {
        console.log(err);
      });
    // save main in store
    this.$store.dispatch("webup/setMain", this);
  }
  /**/
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

  /**/
  public getDialogMessage(): Message {
    console.log("getDialogMessage()", this.dialogMessage);
    return this.dialogMessage;
  }
  public setDialogMessage(message: Message): void {
    this.dialogMessage = message;
    this.dialogVisible = true;
    //console.log("setDialogMessage()", message);
  }
  public getDialogVisible(): boolean {
    //console.log("getDialogVisible()", this.dialogVisible);
    return this.dialogVisible;
  }
  public setDialogVisible(visible: boolean) {
    this.dialogVisible = visible;
  }
  public setDialogConfirm() {
    Vue.prototype.$eventBus.publish("dialog", null);
  }

  /**/
}
</script>
