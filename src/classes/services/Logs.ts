import Service from "@/classes/Service";

export default class Logs extends Service {
  private path: string = "/gtw-logger/api/services";

  async list(): Promise<any> {
    return this.doGet(this.path + "/logList");
  }
}
