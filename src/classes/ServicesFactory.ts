import Dashboard from "./services/Dashboard";
import TemplatesList from "./services/TemplatesList";
import A38Plugins from "./services/A38Plugins";
import A37Plugins from "./services/A37Plugins";
import QueueRabbit from "./services/QueueRabbit";
import Logs from "./services/Logs";

export default class ServiceFactory {
  public createService(key: string): any {
    switch (key) {
      case "DASHBOARD": {
        return new Dashboard();
      }
      case "LISTTEMPLATE": {
        return new TemplatesList();
      }
      case "A38": {
        return new A38Plugins();
      }
      case "A37": {
        return new A37Plugins();
      }
      case "RABBIT": {
        return new QueueRabbit();
      }
      case "LOGS": {
        return new Logs();
      }
      default: {
        //TODO
        return "TODO";
      }
    }
  }
}
