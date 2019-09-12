import Service from "@/classes/Service";

export default class ScriptService extends Service {
  public async getScript(scriptName: string) {
    return this.doGet("/" + scriptName, true);
  }
}
