import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class TemplatesList extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/resource/listTemplates")
        .then((data: any) => {
          if (data.columns) {
            data.columns.unshift({ name: "BT01", title: "" });
          }

          if (data.rows) {
            data.rows.forEach((row: any) => {
              let name: Cell = row.cells["NAME"];
              name = EnrichUtil.addObj(name, "", "", "");
              let date: Cell = row.cells["DATE"];
              date = EnrichUtil.addObj(date, "D8", "*YYMD", "");
              let time: Cell = row.cells["TIME"];
              time = EnrichUtil.addObj(time, "", "", "");
              let type: Cell = row.cells["TYPE"];
              type = EnrichUtil.addObj(type, "", "", "");
              let size: Cell = row.cells["SIZE"];
              size = EnrichUtil.addObj(size, "", "", "");

              // Button 01
              let button01: Cell = {
                value: "Delete plugin",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;LISTTEMPLATE;DELETETMPL) 1(;;[NAME]) NOTIFY(TMPLIS)"
                },
                config: { showtext: false, icon: "mdi mdi-delete" }
              };
              row.cells["BT01"] = button01;

              return row;
            });
          }
          resolve(data);
        });
    });
  }

  // Rows buttons

  async DELETETMPL(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(
            srv.path +
              "/frontend/resource/deleteTemplate/" +
              srv.getObjectCode(1)
          )
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }
}
