import Dashboard from "./services/Dashboard";
import TemplatesList from "./services/TemplatesList";
import A38Plugins from "./services/A38Plugins";
import A37Plugins from "./services/A37Plugins";
import QueueRabbit from "./services/QueueRabbit";
import Logs from "./services/Logs";
import A37Statistics from "./services/A37Statistics";
import Fun from "./Fun";

export default class ServiceFactory {
  public createService(key: string, fun: Fun): any {
    switch (key) {
      case "DASHBOARD": {
        return new Dashboard(fun);
      }
      case "LISTTEMPLATE": {
        return new TemplatesList(fun);
      }
      case "A38": {
        return new A38Plugins(fun);
      }
      case "A37": {
        return new A37Plugins(fun);
      }
      case "A37STATISTICS": {
        return new A37Statistics(fun);
      }
      case "RABBIT": {
        return new QueueRabbit(fun);
      }
      case "LOGS": {
        return new Logs(fun);
      }
      default: {
        //TODO
        return "TODO";
      }
    }
  }
}
