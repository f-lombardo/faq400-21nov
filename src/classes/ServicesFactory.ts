import A37Plugins from "./services/A37Plugins";

export default class ServicesFactory {
  getService(key: string): any | null {
    //return this.variables[key];
    switch (key) {
      case "xxx":
        return A37Plugins;
      default:
        break;
    }
    return null;
  }
}
