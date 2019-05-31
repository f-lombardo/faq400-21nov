import Service from "@/classes/Service";

export default class A38Plugins extends Service {
  private path: string = "/gtw-deployer/api/services";

  async LIST(): Promise<any> {
    return this.doGet(this.path + "/a38PluginList");
  }
}
