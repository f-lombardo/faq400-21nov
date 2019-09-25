<template>
  <v-snackbar v-model="show" :top="top" :timeout="timeout" :color="color()">
    {{ message.text }}
    <v-btn dark flat @click="_setShow(false)">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Message from "@/classes/Message";

@Component
export default class MESSAGE extends Vue {
  @Prop({ default: new Message(null) }) public message!: Message;
  @Prop() public visible: boolean = false;

  public timeout: number = 3000;
  public top: boolean = true;
  private show: boolean = false;

  @Watch("visible")
  onVisibleChanged(val: boolean, oldVal: boolean) {
    if (val && !oldVal) {
      this._setShow(val);
    }
  }

  //emit quando show ridiventa false
  @Watch("show")
  onShowChanged(val: boolean, oldVal: boolean) {
    if (!val) {
      this.$emit("onShowFalse");
    }
  }

  private _setShow(value: boolean) {
    this.show = value;
  }

  color(): string {
    /*
  --btn_color-info: var(--kup-color-info,#6a8fd1);
  --btn_color-danger: var(--kup-danger-danger,#f0423c);
  --btn_color-warning: var(--kup-info-color,#ffd454);
  */
    if (this.message) {
      if (this.message.isError()) {
        return "error";
      } else if (this.message.isWarning()) {
        return "warning";
      }
    }
    return "all-good";
  }
}
</script>
