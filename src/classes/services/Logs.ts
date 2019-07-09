import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class Logs extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/frontend/logger/logList").then((data: any) => {
        if (data.rows) {
          data.rows.forEach((row: any) => {
            let name: Cell = row.cells["NAME"];
            name = EnrichUtil.addObj(name, "", "", "");
            let date: Cell = row.cells["DATE"];
            date = EnrichUtil.addObj(date, "", "", "");
            let time: Cell = row.cells["TIME"];
            time = EnrichUtil.addObj(time, "", "", "");
            let type: Cell = row.cells["TYPE"];
            type = EnrichUtil.addObj(type, "", "", "");
            let size: Cell = row.cells["SIZE"];
            size = EnrichUtil.addObj(size, "", "", "");
            let link: Cell = row.cells["LINK"];
            link = EnrichUtil.addObj(link, "", "", "");
            let path: Cell = row.cells["PATH"];
            path = EnrichUtil.addObj(path, "", "", "");
            let view: Cell = row.cells["VIEW"];
            view = EnrichUtil.addObj(view, "", "", "");
            return row;
          });
        }
        resolve(data);
      });
    });
  }
}
