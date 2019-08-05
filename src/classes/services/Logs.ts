import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class Logs extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/frontend/logger/logList").then((data: any) => {
        if (data.columns) {
          data.columns.unshift({ name: "BT03", title: "" });
          data.columns.unshift({ name: "BT02", title: "" });
          data.columns.unshift({ name: "BT01", title: "" });
          data.columns.forEach((column: any) => {
            if (
              column.name == "LINK" ||
              column.name == "PATH" ||
              column.name == "VIEW"
            ) {
              column.visible = false;
            }
            return column;
          });
        }

        if (data.rows) {
          data.rows.forEach((row: any) => {
            let name: Cell = row.cells["NAME"];
            name = EnrichUtil.addObj(name, "", "", "");
            let date: Cell = row.cells["DATE"];
            date = EnrichUtil.addObj(date, "D8", "", "");
            let time: Cell = row.cells["TIME"];
            time = EnrichUtil.addObj(time, "", "", "");
            let type: Cell = row.cells["TYPE"];
            type = EnrichUtil.addObj(type, "", "", "");
            let size: Cell = row.cells["SIZE"];
            size = EnrichUtil.addObj(size, "", "", "");
            let link: Cell = row.cells["LINK"];
            link = EnrichUtil.addObj(link, "J1", "URL", "");
            let path: Cell = row.cells["PATH"];
            path = EnrichUtil.addObj(path, "", "", "");
            let view: Cell = row.cells["VIEW"];
            view = EnrichUtil.addObj(view, "", "", "");

            // Buttons
            // Button 01
            let button01: Cell = {
              value: "View log",
              obj: { t: "J4", p: "BTN", k: "F(FBK;LOGS;OPNPATH) 1(;;[VIEW])" },
              config: { showtext: false, icon: "mdi mdi-file-document" }
            };
            row.cells["BT01"] = button01;

            // Button 02
            let button02: Cell = {
              value: "View log",
              obj: { t: "J4", p: "BTN", k: "F(FBK;LOGS;OPNPATH) 1(;;[LINK])" },
              config: { showtext: false, icon: "mdi mdi-download" }
            };
            row.cells["BT02"] = button02;

            // Button 03
            let button03: Cell = {
              value: "View log",
              obj: {
                t: "J4",
                p: "BTN",
                k: "F(FBK;LOGS;DELETELOG) 1(;;[NAME]) NOTIFY(TITLOG)"
              },
              config: { showtext: false, icon: "mdi mdi-delete" }
            };
            row.cells["BT03"] = button03;

            return row;
          });
        }
        resolve(data);
      });
    });
  }

  async OPNPATH(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      const url = <string>srv.object1;
      window.open(url, "_blank");
    });
  }

  async DELETELOG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/logger/deleteLogFile/" + srv.object1)
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }
}
