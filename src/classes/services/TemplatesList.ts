import Service from "@/classes/Service";

export default class TemplatesList extends Service {
  private path: string = "/gtw-resource-manager/api/services";

  async list(): Promise<any> {
    return this.doGet(this.path + "/listTemplates");
  }
}
