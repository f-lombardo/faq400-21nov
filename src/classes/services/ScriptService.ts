import Service from "@/classes/Service";
import Vue from "vue";

export default class ScriptService extends Service {
  public async getScript(scriptName: string) {
    return await this.doGet(
      Vue.prototype.$SmeUP.GTWFrontend.urls.config + scriptName
    );
  }
}
