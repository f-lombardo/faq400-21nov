<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapActions } from "vuex";

import Fun from "@/classes/Fun";
import FunManager from "@/classes/FunManager";
import Dynamism from "@/classes/Dynamism";
import ImplicitVariable from "@/interfaces/ImplicitVariable";

const variableContextMixin = require("@/mixins/variableContextMixin.js");
import VariableContext from "@/classes/VariableContext";

@Component
export default class Basic extends VariableContext {
  @Prop() protected component: any;

  // protected name: string = "";

  private implicitVariables?: ImplicitVariable[];

  protected created(): void {
    if (this.component) {
      if (this.component.loaded == true && this._hasFun()) {
        var fun: Fun = new Fun(this.component.fun);
        // TODO modificare questa parte. *SCO dev'essere un servizio come gli altri.
        // Quindi ci sarà solo l'execute come metodo
        this.addComponent();
        if (fun.isServiceExternal()) {
          this.component = this.$funManager.getScript(fun);
          this.reloadComponent();
        } else {
          Vue.prototype.$funManager.execute(fun).then((data: any) => {
            this.component.data = data;
            this.reloadComponent();
          });
        }
      } else {
        this.addComponent();
      }
    }
  }

  private _hasFun(): boolean {
    return this.component.fun && this.component.fun != "";
  }

  protected addComponent(): void {
    // saving component in store
    this.$store.dispatch("webup/addComponent", this);
  }

  protected reloadComponent(): void {
    // reload component in root store
    this.$store.dispatch("webup/reloadComponent", this.component);
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

  protected getDynamisms(dynamismName: string): Dynamism[] {
    if (this.hasDynamisms()) {
      return this.component.dynamisms.filter(
        (dynamism: Dynamism) => dynamismName === dynamism.event
      );
    }
    return [];
  }
}
</script>
