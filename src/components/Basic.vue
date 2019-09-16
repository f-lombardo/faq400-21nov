<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { mapActions } from "vuex";

import Fun from "@/classes/Fun";
import Dynamism from "@/classes/Dynamism";
import ImplicitVariable from "@/interfaces/ImplicitVariable";

const variableContextMixin = require("@/mixins/variableContextMixin.js");
import VariableContext from "@/classes/VariableContext";

@Component
export default class Basic extends VariableContext {
  @Prop() protected component: any;

  private implicitVariables?: ImplicitVariable[];
  private timer?: number;

  protected created(): void {
    if (this.component) {
      if (this.component.loaded == true && this.hasFun()) {
        this.addComponent();
        this._execFun();
        if (
          this.component.options &&
          this.component.options.refresh &&
          !isNaN(this.component.options.refresh)
        ) {
          // console.log("SET AUTO REFRESH COMPONENT " + this.component.id);
          this.timer = setInterval(
            this._execFun,
            this.component.options.refresh
          );
        }
      } else {
        this.addComponent();
      }
    }
  }

  protected mounted(): void {
    this.$on("onExecFun", this._execFun);
  }

  public hasFun(): boolean {
    return this.component.fun && this.component.fun != "";
  }

  private _execFun(): void {
    console.log("EXECUTE FUN COMPONENT " + this.component.id);
    console.log("EXECUTE FUN " + this.component.fun);

    const fun: Fun = new Fun(this.component.fun);
    if (fun.isServiceExternal()) {
      this.$funManager
        .getScript(fun)
        .then((data: any) => {
          this.reloadComponent();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$funManager.execute(fun).then((data: any) => {
        this.reloadDataComponent(data);
      });
    }
  }

  protected addComponent(): void {
    // saving component in store
    this.$store.dispatch("webup/addComponent", this);
  }

  protected reloadComponent(): void {
    // reload component in root store
    this.$store.dispatch("webup/reloadComponent", this.component).then(() => {
      this.$forceUpdate();
    });
  }

  protected reloadDataComponent(data: any): void {
    // reload data component in root store
    this.$store
      .dispatch("webup/reloadDataComponent", {
        data,
        id: this.component.id
      })
      .then(() => {
        this.$forceUpdate();
      });
  }

  protected cancelAutoRefresh() {
    // console.log("DESTROY AUTO REFRESH COMPONENT " + this.component.id);
    clearInterval(this.timer);
  }

  protected beforeDestroy() {
    if (this.timer) {
      this.cancelAutoRefresh();
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch("webup/removeComponent", this);
    }
    this.$off("onExecFun");
  }

  public getOptions() {
    // TODO questo sara' da rivedere quando gestiremo i setup 'correttamente'
    if (this.component.options && this.component.type) {
      if (this.component.type === "FLD")
        return this.component.options[this.component.type].default;
      else return this.component.options;
    }
    return {};
  }

  public getData() {
    if (this.component.data) {
      return this.component.data;
    }
    return {};
  }

  protected hasDynamisms(): boolean {
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
