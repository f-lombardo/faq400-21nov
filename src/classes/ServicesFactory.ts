import A37Plugins from "./services/A37Plugins";

export default class ServiceFactory {
  public createService(key: string): any {
    if (key === "A37") {
      const pluginA37 = new A37Plugins();
      return pluginA37;
    }
  }
}
