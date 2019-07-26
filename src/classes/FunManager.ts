import { Vue } from "vue-property-decorator";

import Fun from "@/classes/Fun";
import FunObject from "./FunObject";
import ServiceFactory from "./ServicesFactory";

export default class FunManager {
  async execute(fun: Fun): Promise<any> {
    return new Promise(function(resolve) {
      let method = fun.getMethod().replace(/\s+/g, "");
      let service = fun.getService().replace(/\s+/g, "");
      resolve(new ServiceFactory().createService(service)[method]());
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
