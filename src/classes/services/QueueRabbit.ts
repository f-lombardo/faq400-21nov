import Service from "@/classes/Service";

export default class QueueRabbit extends Service {
  private path: string = "/gtw-hub/api/services";

  async list(): Promise<any> {
    return this.doGet(this.path + "/rabbitQueueList");
  }
}
