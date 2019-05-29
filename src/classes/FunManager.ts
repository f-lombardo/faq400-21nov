import Fun from "@/classes/Fun";
import FunObject from "./FunObject";

import { PRVSHO } from "@/mocks/PRVSHO.ts";
import { PRV123 } from "@/mocks/PRV123.ts";
import { PRV456 } from "@/mocks/PRV456.ts";

export default class FunManager {
  execute(fun: Fun): any {
    //TODO
  }

  getScript(fun: Fun): any {
    // TODO Gestire l'importazione dinamica dello script
    var obj2: FunObject | null = fun.getObject(2);
    if (obj2) {
      switch (obj2.getMethod()) {
        case "PRVSHO": {
          return PRVSHO;
        }
        case "PRV123": {
          return PRV123;
        }
        case "PRV456": {
          return PRV456;
        }
        default: {
          return PRVSHO;
        }
      }
    }
  }
}
