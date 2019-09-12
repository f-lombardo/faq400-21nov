<template>
  <v-dialog v-model="show" hide-overlay persistent width="300">
    <v-card :color="color()">
      <!--  font-weight-bold text--primary -->
      <v-card-title class="headline font-weight-bold">WARNING</v-card-title>
      <v-card-text class="headline">{{ message.text }}</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="_cancel(false)">Cancel</v-btn>
        <v-btn text @click="_confirm()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Message from "@/classes/Message";

@Component
export default class DIALOG extends Vue {
  @Prop({ default: new Message(null) }) public message!: Message;
  @Prop() public visible: boolean = false;

  private show: boolean = false;

  @Watch("visible")
  onVisibleChanged(val: boolean, oldVal: boolean) {
    if (val && !oldVal) {
      this._setShow(val);
    }
  }

  private _setShow(value: boolean) {
    this.show = value;
  }

  private _cancel() {
    this._setShow(false);
    this.$emit("onCancel");
  }
  private _confirm() {
    this._setShow(false);
    this.$emit("onConfirm");
  }

  color(): string {
    /*
  --btn_color-info: var(--kup-color-info,#6a8fd1);
  --btn_color-danger: var(--kup-danger-danger,#f0423c);
  --btn_color-warning: var(--kup-info-color,#ffd454);
  */
    if (this.message) {
      if (this.message.isError()) {
        return "#f0423c";
      } else if (this.message.isWarning()) {
        return "#ffd454";
      }
    }
    return "#6a8fd1";
  }
}
</script>
