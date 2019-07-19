<template>
  <v-snackbar v-model="show" :top="top" :timeout="timeout" color="#606">
    {{ text }}
    <v-btn dark flat @click="show=false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

/*
@Component({
  computed: {
    //TODO
    show: {}
  }
})
*/
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
  //TODO $emit quando show ridiventa false
  @Watch("show")
  onShowChanged(val: boolean, oldVal: boolean) {
    if (!val) {
      this.$emit("showFalse");
    }
  }

  // export default {
  /*
[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
Instead, use a data or computed property based on the prop's value.
Prop being mutated: "visible"
https://stackoverflow.com/questions/43959824/instead-use-a-data-or-computed-property-based-on-the-props-value-vue-js
https://michaelnthiessen.com/avoid-mutating-prop-directly/

  data() {
    return {
      snackbar: false,
      color: "",
      mode: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar"
    };
  }*/
  // }
}
</script>
