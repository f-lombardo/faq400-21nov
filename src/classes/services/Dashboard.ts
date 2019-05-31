import Service from "@/classes/Service";

export default class Dashboard extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    return this.doGet(this.path + "/dashboard");
  }
}
