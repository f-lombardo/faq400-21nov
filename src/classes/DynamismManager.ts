import { Vue } from "vue-property-decorator";

import Dynamism from "@/classes/Dynamism";
import Fun from "@/classes/Fun";
import ExpressionEvaluator from "./expressions/ExpressionEvaluator";

import IBasic from "@/interfaces/IBasic";
import BasicComponent from "@/interfaces/BasicComponent";

export default class DynamismManager {
  execute(vueComponent: any, dynamism: Dynamism): void {
    if (!dynamism.source) {
      // TODO lanciare errore?
      return;
    }
    // check enable
    if (!dynamism.isEnabled()) {
      // TODO messaggio
      return;
    }
    // check targets
    if (!dynamism.targets || dynamism.targets.length == 0) {
      // save variable in source
      const vueSource = vueComponent.$store.getters["webup/getComponentById"](
        dynamism.source.id
      );
      this._executeAssignmentsInTarget(vueSource, dynamism);
      //
    } else {
      dynamism.targets
        .map(target =>
          vueComponent.$store.getters["webup/getComponentById"](target)
        )
        .filter((c: any) => c)
        .forEach((c: any) => {
          // save variables in target
          // set loaded to true
          c.component.loaded = true;
          this._executeAssignmentsInTarget(c, dynamism);
          // compose the fun
          const evaluatedFun = new ExpressionEvaluator().variableExpression(
            c,
            c.component.fun
          );
          // execute the fun
          const fun: Fun = new Fun(evaluatedFun);
          // TODO sistemare anche qui il discorso del getscript che deve diventare execute
          // con *SCO come servizio uguale agli altri
          // TODO esportare execute fun in un private method per riutilizzarlo
          if (fun.isServiceExternal()) {
            Vue.prototype.$funManager
              .getScript(fun)
              .then((newComponent: any) => {
                // reload component
                this._reloadComponent(vueComponent.$store, newComponent);
              })
              .catch((err: any) => {
                console.log(err);
              });
          } else {
            this._getDataThenReload(vueComponent.$store, fun, c);
          }
        });
    }
    // exec
    if (dynamism.targets.length == 0 && dynamism.exec && dynamism.exec != "") {
      const evaluatedFun = new ExpressionEvaluator().variableExpression(
        vueComponent,
        dynamism.exec
      );
      this._execFun(vueComponent, evaluatedFun);
    }
  }

  private _getDataThenReload(store: any, fun: Fun, vueComponent: any) {
    Vue.prototype.$funManager.execute(fun).then((data: any) => {
      // reload component
      this._reloadDataComponent(store, {
        data,
        vueComponent
      });
    });
  }

  private _reloadComponent(store: any, component: BasicComponent): void {
    // get VueComponent
    const vueComponent = store.getters["webup/getComponentById"](component.id);
    store.dispatch("webup/reloadComponent", component);
    if (vueComponent) {
      vueComponent.$forceUpdate();
    } else {
      alert("Component " + component.id + " not found.");
    }
  }

  private _reloadDataComponent(store: any, payload: any): void {
    store
      .dispatch("webup/reloadDataComponent", {
        data: payload.data,
        id: payload.vueComponent.component.id
      })
      .then(() => {
        payload.vueComponent.$forceUpdate();
      });
  }

  private _execFun(vueComponent: any, evaluatedFun: string): void {
    // TODO check fun virtuali?
    const fun: Fun = new Fun(evaluatedFun);
    if (fun.isServiceExternal()) {
      // load new component
      // TODO ma è giusta questa cosa qui? Mi ritorna sempre la scheda da sostituire alla root?
      Vue.prototype.$funManager
        .getScript(fun)
        .then((newEXD: any) => {
          vueComponent.$store.dispatch("webup/setRoot", newEXD);
          // TODO verificare se bisogna fare forceUpdate su MainComponent
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    if (fun.isVoid()) {
      Vue.prototype.$funManager.execute(fun).then(() => {
        if (fun.getNotify()) {
          const notifyVueComponent = vueComponent.$store.getters[
            "webup/getComponentById"
          ](fun.getNotify());
          if (notifyVueComponent && notifyVueComponent.hasFun()) {
            notifyVueComponent.$emit("onExecFun");
          }
        }
      });
    }
  }

  private _executeAssignmentsInTarget(vueTarget: IBasic, dynamism: Dynamism) {
    if (!vueTarget) {
      return;
    }
    // variables from source component
    if (dynamism.source && parseInt(dynamism.source.variables.length) > 0) {
      for (let k in dynamism.source.variables) {
        vueTarget.putVariable(k, dynamism.source.variables[k]);
      }
    }
    // variables from dyn
    if (dynamism.variables) {
      for (let k in dynamism.variables) {
        vueTarget.putVariable(k, dynamism.variables[k]);
      }
    }

    // TODO variabili esplicite del dinamismo (voglio piangere)

    // TODO (forse) riresettare le variabili implicite

    // change title
    if (dynamism.title) {
      vueTarget.component.title = dynamism.title;
    }
  }
}
