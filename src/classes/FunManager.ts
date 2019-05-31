import Fun from "@/classes/Fun";
import FunObject from "./FunObject";
import ServiceFactory from "./ServicesFactory";

import { PRVSHO } from "@/mocks/PRVSHO.ts";
import { TODO } from "@/mocks/TODO";

export default class FunManager {
  async execute(fun: Fun): Promise<any> {
    return new Promise(function(resolve) {
      resolve(
        new ServiceFactory().createService(fun.getService())[fun.getMethod()]()
      );
    });
  }

  getScript(fun: Fun): any {
    // TODO Gestire l'importazione dinamica dello script
    var obj2: FunObject | null = fun.getObject(2);
    if (obj2) {
      switch (obj2.getMethod()) {
        case "PRVSHO": {
          return PRVSHO;
        }
        default: {
          return TODO;
        }
      }
    }
  }
}
