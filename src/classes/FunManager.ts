import Fun from "@/classes/Fun";
import FunObject from "./FunObject";

export default class FunManager {
  execute(fun: Fun): any {
    //TODO
  }

  getScript(fun: Fun): any {
    var obj2: FunObject | null = fun.getObject(2);
    if (obj2) {
      const script = import("@/mocks/" + obj2.getMethod + ".json");
      if (script) {
        return script;
      } else {
        // TODO
        throw "Error";
      }
    }
  }
}
