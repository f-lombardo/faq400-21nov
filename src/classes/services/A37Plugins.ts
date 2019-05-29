import RestService from "./RestService";

export default class A37Plugins extends RestService {
  private BASE_PATH = "/gtw-deployer/api/services/";

  /**/
  //http://172.16.2.119:8096/gtw-deployer/api/services/a37PluginList
  getPluginList(): string {
    var url: string = this.getServiceURL(this.BASE_PATH, "a37PluginList");
    return this.callRest(url, []);
  }
  //Refresh single A37 plugin - http://172.16.2.119:8096/gtw-deployer/api/services/a37refresh/{id}
  refresh(id: string): string {
    var url: string = this.getServiceURL(this.BASE_PATH, "a37refresh");
    return this.callRest(url, [id]);
  }

  /*
  getServiceURL(method: string): string {
    //return this.variables[key];
    switch (method) {
      case "PluginList":
        return this.BASE_PATH + "A37Plugins";
      case "deploy":
        return this.BASE_PATH + "a37deploy/" + { id };
      default:
        break;
    }
    return "";
  }
  */
}
