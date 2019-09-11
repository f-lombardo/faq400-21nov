import { Vue } from "vue-property-decorator";

import Fun from "@/classes/Fun";
import FunObject from "./FunObject";
import ServiceFactory from "./ServicesFactory";
import Message from "./Message";
import A37Plugins from "./services/A37Plugins";

export default class FunManager {
  async execute(fun: Fun): Promise<any> {
    return new Promise(function(resolve) {
      //remove all whitespace chars
      const serviceName = fun.getService().replace(/\s+/g, "");
      const method = fun.getMethod().replace(/\s+/g, "");
      /*
      let object1String: String = "";
      let obj1: FunObject | null = fun.getObject(1);
      if (obj1) {
        object1String = obj1.getMethod();
      }
      */
      console.log("§FUN§", fun);
      const service = new ServiceFactory().createService(serviceName, fun);
      const uisup = fun.getUISetup();
      if (uisup && uisup.isConfirmationRequired()) {
        Vue.prototype.$dialogManager.confirm(
          new Message({
            type: "CONFIRM",
            text: uisup.getMsg()
          }),
          service[method].bind()
        );
        resolve();
      } else {
        resolve(service[method]());
      }
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
