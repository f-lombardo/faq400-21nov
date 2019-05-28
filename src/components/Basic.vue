<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

import Fun from "@/classes/Fun";
import FunManager from "@/classes/FunManager";
import Dynamism from "@/classes/Dynamism";
import ImplicitVariable from "@/interfaces/ImplicitVariable";

const variableContextMixin = require("@/mixins/variableContextMixin.js");
import VariableContext from "@/classes/VariableContext";

@Component
export default class Basic extends VariableContext {
  @Prop() protected component!: any;

  comp: any = {};

  protected name: string = "";

  private implicitVariables?: ImplicitVariable[];

  protected created(): void {
    if (this.component) {
      // get data
      if (this.component.loaded == true) {
        var fun: Fun = new Fun(this.component.fun);
        console.log(fun);
        if (fun.isServiceExternal()) {
          this.component = this.$funManager.getScript(fun);
        } else {
          this.component.data = this.$funManager.execute(fun);
        }
      }
      this.comp = this.component;
      // saving component in store
      this.$store.dispatch("webup/addComponent", this);
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch("webup/removeComponent", this);
    }
  }

  public getOptions(): any {
    // TODO questo sara' da rivedere quando gestiremo i setup 'correttamente'
    if (this.component.options && this.component.type) {
      if (this.component.type === "FLD")
        return this.component.options[this.component.type].default;
      else return this.component.options;
    }
    return {};
  }

  public getData(): any {
    if (this.component.data) {
      return this.component.data;
    }
    return {};
  }

  protected hasDynamisms() {
    return (
      this.component != null &&
      this.component.dynamisms &&
      this.component.dynamisms.length > 0
    );
  }

  protected getDynamisms(dynName: string): Dynamism[] {
    if (this.hasDynamisms()) {
      return this.component.dynamisms.filter(
        (d: Dynamism) => dynName === d.event
      );
    }
    return [];
  }
}
</script>
