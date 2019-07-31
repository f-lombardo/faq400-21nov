import Dashboard from "./services/Dashboard";
import TemplatesList from "./services/TemplatesList";
import A38Plugins from "./services/A38Plugins";
import A37Plugins from "./services/A37Plugins";
import QueueRabbit from "./services/QueueRabbit";
import Logs from "./services/Logs";

export default class ServiceFactory {
  public createService(key: string, obj1: String): any {
    switch (key) {
      case "DASHBOARD": {
        return new Dashboard(obj1);
      }
      case "LISTTEMPLATE": {
        return new TemplatesList(obj1);
      }
      case "A38": {
        return new A38Plugins(obj1);
      }
      case "A37": {
        return new A37Plugins(obj1);
      }
      case "RABBIT": {
        return new QueueRabbit(obj1);
      }
      case "LOGS": {
        return new Logs(obj1);
      }
      default: {
        //TODO
        return "TODO";
      }
    }
  }
}
