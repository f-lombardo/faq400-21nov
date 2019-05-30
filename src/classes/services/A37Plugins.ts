import RestService from "./RestService";

export default class A37Plugins extends RestService {
  private BASE_PATH = "/gtw-deployer/api/services/";

  getPluginList(): any {
    //TODO
    //var url: string = this.getServiceURL(this.BASE_PATH, "a37PluginList");
    //return this.callRest(url, []);
    return [
      {
        value: "PRVSHO"
      },
      {
        value: "PRV123"
      },
      {
        value: "PRV456"
      }
    ];
  }

  refresh(id: string): string {
    var url: string = this.getServiceURL(this.BASE_PATH, "a37refresh");
    return this.callRest(url, [id]);
  }
}
