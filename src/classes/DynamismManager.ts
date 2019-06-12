import { Vue } from "vue-property-decorator";

import Dynamism from "@/classes/Dynamism";
import Fun from "@/classes/Fun";
import ExpressionEvaluator from "./expressions/ExpressionEvaluator";

import IBasic from "@/interfaces/IBasic";

export default class DynamismManager {
  execute(comp: any, dyn: Dynamism): void {
    if (!dyn.source) {
      // TODO lanciare errore?
      return;
    }
    // check enable
    if (!dyn.isEnabled()) {
      // TODO messaggio
      return;
    }
    // check targets
    if (!dyn.targets || dyn.targets.length == 0) {
      // save variable in source
      this._executeAssignmentsInTarget(dyn.source, dyn);
    } else {
      dyn.targets
        .map(target => comp.$store.getters["webup/getComponentById"](target))
        .filter((c: any) => c)
        .forEach((c: any) => {
          // save variables in target
          c.component.loaded = true;
          this._executeAssignmentsInTarget(c, dyn);
          // compose the fun
          const evaluatedFun = new ExpressionEvaluator().variableExpression(
            c,
            c.component.fun
          );
          // get new component
          var fun: Fun = new Fun(evaluatedFun);
          var newComp: any;
          if (fun.isServiceExternal()) {
            newComp = Vue.prototype.$funManager.getScript(fun);
            // reload component
            this._reloadComponent(comp.$store, c, newComp);
          } else {
            Vue.prototype.$funManager.execute(fun).then((data: any) => {
              c.component.data = data;
              newComp = c.component;
              // reload component
              this._reloadComponent(comp.$store, c, newComp);
            });
          }
        });
    }
    // exec
    if (!dyn.targets && dyn.exec && dyn.exec !== "") {
      const evaluatedFun = new ExpressionEvaluator().variableExpression(
        comp,
        dyn.exec
      );
      this._execFun(comp, evaluatedFun);
    }
  }

  private _reloadComponent(store: any, oldComp: any, newComp: any): void {
    store.dispatch("webup/reloadComponent", {
      comp: oldComp,
      newComp
    });
  }

  private _execFun(comp: any, evaluatedFun: string): void {
    // TODO check fun virtuali?

    // load new exd
    var fun: Fun = new Fun(evaluatedFun);
    const newExd = Vue.prototype.$funManager.getScript(fun);
    comp.$store.dispatch("webup/reloadExd", newExd);
  }

  private _executeAssignmentsInTarget(target: IBasic, dyn: Dynamism) {
    // variables from source component
    if (dyn.source && dyn.source.variables) {
      for (let k in dyn.source.variables) {
        target.putVariable(k, dyn.source.variables[k]);
      }
    }
    // variables from dyn
    if (dyn.variables) {
      for (let k in dyn.variables) {
        target.putVariable(k, dyn.variables[k]);
      }
    }

    // TODO variabili esplicite del dinamismo (voglio piangere)

    // TODO (forse) riresettare le variabili implicite

    // change title
    if (dyn.title) {
      target.component.title = dyn.title;
    }
  }
}
