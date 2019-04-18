import { Vue } from "vue-property-decorator";

import Dynamism from "@/classes/Dynamism";
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
    if (!dyn.exec) {
      // check targets
      if (!dyn.targets || dyn.targets.length == 0) {
        // save variable in source
        this.executeAssignmentsInTarget(dyn.source, dyn);
      } else {
        dyn.targets
          .map(target => comp.$store.getters["webup/getComponentById"](target))
          .filter((c: any) => c)
          .forEach((c: any) => {
            // save variables in target
            this.executeAssignmentsInTarget(c, dyn);

            // ricalcola la fun
            const evaluatedFun = new ExpressionEvaluator().variableExpression(
              c,
              c.component.fun
            );

            // ricarica componente
            comp.$store.dispatch("webup/reloadComponent", {
              comp: c,
              fun: evaluatedFun
            });
          });
      }
    } else {
      this.exec(comp, dyn);
    }
  }

  public exec(comp: any, dyn: Dynamism) {
    // save variable in comp
    this.executeAssignmentsInTarget(comp, dyn);
    // ricalcola la fun
    const evaluatedFun = new ExpressionEvaluator().variableExpression(
      comp,
      dyn.exec
    );
    // carica nuova scheda
    comp.$store.dispatch("webup/reloadExd", evaluatedFun);
  }

  executeAssignmentsInTarget(target: IBasic, dyn: Dynamism) {
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
