import Service from "@/classes/Service";

export default class A37Plugins extends Service {
  private path: string = "/gtw-deployer/api/services";

  async LIST(): Promise<any> {
    return this.doGet(this.path + "/a37PluginList");
  }
}
