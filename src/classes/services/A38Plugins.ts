import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class A38Plugins extends Service {
  private path: string = "/gtw-deployer/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/a38PluginList").then((data: any) => {
        if (data.rows) {
          data.rows = data.rows.map((row: any) => {
            let conf: Cell = row.cells["CONF"];
            conf = EnrichUtil.addObj(conf, "", "", "");
            let txt: Cell = row.cells["TEXT"];
            txt = EnrichUtil.addObj(txt, "", "", "");
            let art: Cell = row.cells["ARTIF"];
            art = EnrichUtil.addObj(art, "", "", "");
            let version: Cell = row.cells["VERS"];
            version = EnrichUtil.addObj(version, "", "", "");
            let stat: Cell = row.cells["STATUS"];
            stat = EnrichUtil.addObj(stat, "", "", "");
            let on: Cell = row.cells["ONLINE"];
            on = EnrichUtil.addObj(on, "", "", "");
            let ready: Cell = row.cells["READY"];
            ready = EnrichUtil.addObj(ready, "", "", "");
            let war: Cell = row.cells["WAR"];
            war = EnrichUtil.addObj(war, "", "", "");
            let del: Cell = row.cells["DELO"];
            del = EnrichUtil.addObj(del, "", "", "");
            return row;
          });
        }
        resolve(data);
      });
    });
  }
}
