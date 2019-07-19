<template>
  <v-snackbar v-model="show" :top="top" :timeout="timeout" color="#606">
    {{ text }}
    <v-btn dark flat @click="show=false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class MESSAGE extends Vue {
  @Prop() public text: string = "";
  @Prop() public visible: boolean = false;

  public timeout: number = 3000;
  public top: boolean = true;
  private show: boolean = false;

  @Watch("visible")
  onVisibleChanged(val: boolean, oldVal: boolean) {
    if (val && !oldVal) {
      this.show = val;
    }
  }
  //$emit quando show ridiventa false
  @Watch("show")
  onShowChanged(val: boolean, oldVal: boolean) {
    if (!val) {
      this.$emit("showFalse");
    }
  }
}
</script>
