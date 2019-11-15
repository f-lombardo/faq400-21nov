import Dashboard from "./services/Dashboard";
import All from "./services/All";
import Operations from "./services/Operations";
import Manufacturing from "./services/Manufacturing";
import Administration from "./services/Administration";
import Software from "./services/Software";

import Fun from "./Fun";

export default class ServiceFactory {
  public createService(key: string, fun: Fun): any {
    switch (key) {
      case "DASHBOARD": {
        return new Dashboard(fun);
      }
      case "ALL": {
        return new All(fun);
      }
      case "OPERATIONS": {
        return new Operations(fun);
      }
      case "MANUFACTURING": {
        return new Manufacturing(fun);
      }
      case "ADMINISTRATION": {
        return new Administration(fun);
      }
      case "SOFTWARE": {
        return new Software(fun);
      }
      default: {
        //TODO
        return "TODO";
      }
    }
  }
}
