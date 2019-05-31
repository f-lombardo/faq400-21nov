import Service from "@/classes/Service";

export default class Logs extends Service {
  private path: string = "/gtw-logger/api/services";

  async LIST(): Promise<any> {
    return this.doGet(this.path + "/logList");
  }
}
