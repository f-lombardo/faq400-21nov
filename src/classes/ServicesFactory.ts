import Dashboard from "./services/Dashboard";
import TemplatesList from "./services/TemplatesList";
import A38Plugins from "./services/A38Plugins";
import A37Plugins from "./services/A37Plugins";
import QueueRabbit from "./services/QueueRabbit";
import Logs from "./services/Logs";

export default class ServiceFactory {
  public createService(key: string): any {
    switch (key) {
      case "Dashboard": {
        return new Dashboard();
      }
      case "Templates list": {
        return new TemplatesList();
      }
      case "A38 plugins": {
        return new A38Plugins();
      }
      case "A37 plugins": {
        return new A37Plugins();
      }
      case "Queue rabbit": {
        return new QueueRabbit();
      }
      case "Logs": {
        return new Logs();
      }
      default: {
        //TODO
        return "TODO";
      }
    }
  }
}
