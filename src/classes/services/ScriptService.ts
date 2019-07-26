import Service from "@/classes/Service";

export default class ScriptService extends Service {
  private _serverConfigURL: string = "http://localhost:3000/config/";

  public async getScript(scriptName: string) {
    return await this.doGet(this._serverConfigURL + scriptName);
  }
}
