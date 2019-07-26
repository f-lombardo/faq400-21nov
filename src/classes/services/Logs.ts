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
            date = EnrichUtil.addObj(date, "", "", "");
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
            var action01 = view.value;
            let button01: Cell = {
              value: "",
              obj: { t: "J4", p: "ICO", k: "" }
            };
            button01 = EnrichUtil.setCellIcon(
              button01,
              "mdi mdi-file-document",
              ""
            );
            row.cells["BT01"] = button01;

            // Button 02
            var action02 = link.value;
            let button02: Cell = {
              value: "",
              obj: { t: "J4", p: "ICO", k: "" }
            };
            button02 = EnrichUtil.setCellIcon(button02, "mdi mdi-download", "");
            row.cells["BT02"] = button02;

            // Button 03
            var action03 =
              srv.path + "/frontend/logger/deleteLogFile/" + name.value;

            let button03: Cell = {
              value: "",
              obj: { t: "J4", p: "ICO", k: "" }
            };
            button03 = EnrichUtil.setCellIcon(button03, "mdi mdi-delete", "");
            row.cells["BT03"] = button03;

            return row;
          });
        }
        resolve(data);
      });
    });
  }
}
