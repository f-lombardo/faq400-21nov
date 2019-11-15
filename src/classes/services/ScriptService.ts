import Service from "@/classes/Service";

import dashboard from "@/mocks/Dashboard.json";
import all from "@/mocks/All.json";
import operations from "@/mocks/Operations.json";
import manufacturing from "@/mocks/Manufacturing.json";
import administration from "@/mocks/Administration.json";
import software from "@/mocks/Software.json";

export default class ScriptService extends Service {
  public async getScript(scriptName: string) {
    // return this.doGet("/" + scriptName, true);
    switch (scriptName) {
      case "Dashboard": {
        return dashboard;
      }
      case "All": {
        return all;
      }
      case "Operations": {
        return operations;
      }
      case "ManufacturingSystems": {
        return manufacturing;
      }
      case "AdministrationSystems": {
        return administration;
      }
      case "SoftwareSupport": {
        return software;
      }
      default: {
        return dashboard;
      }
    }
  }
}
