import { Vue } from "vue-property-decorator";

import Fun from "@/classes/Fun";
import FunObject from "./FunObject";
import ServiceFactory from "./ServicesFactory";

export default class FunManager {
  async execute(fun: Fun): Promise<any> {
    return new Promise(function(resolve) {
      let service = fun.getService().replace(/\s+/g, "");
      let method = fun.getMethod().replace(/\s+/g, "");
      /*
      let object1String: String = "";
      let obj1: FunObject | null = fun.getObject(1);
      if (obj1) {
        object1String = obj1.getMethod();
      }
      */
      resolve(new ServiceFactory().createService(service, fun)[method]());
    });
  }

  async getScript(fun: Fun): Promise<any> {
    var obj2: FunObject | null = fun.getObject(2);
    if (obj2) {
      let scriptName = obj2.getMethod().replace(/\s+/g, "");
      return await Vue.prototype.$scriptManager.getScript(scriptName);
    }
  }
}
