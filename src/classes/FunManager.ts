import Fun from "@/classes/Fun";
import FunObject from "./FunObject";
import ServiceFactory from "./ServicesFactory";

import { DASHBOARD } from "@/mocks/DASH";
import { LIST } from "@/mocks/LIST";
import { A37 } from "@/mocks/A37";
import { RABBIT } from "@/mocks/RABBIT";
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
        case "Dashboard": {
          return DASHBOARD;
        }
        case "Templates list": {
          return LIST;
        }
        case "A37 plugins": {
          return A37;
        }
        case "Queue rabbit": {
          return RABBIT;
        }
        default: {
          return TODO;
        }
      }
    }
  }
}
