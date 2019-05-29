import Fun from "@/classes/Fun";
import FunObject from "./FunObject";

export default class FunManager {
  execute(fun: Fun): any {
    //TODO
  }

  async getScript(fun: Fun) {
    var obj2: FunObject | null = fun.getObject(2);
    if (obj2) {
      const path = "@/mocks/" + obj2.getMethod() + ".ts";
      const script = await import(path);
      console.log(script);
      return script;
    }
  }
}
