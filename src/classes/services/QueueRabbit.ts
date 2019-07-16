import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import { convertRows } from "@/assets/dist/types/components/kup-chart/kup-chart-builder";

export default class QueueRabbit extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/hub/rabbitQueueList")
        .then((data: any) => {
          if (data.columns) {
            data.columns.unshift({ name: "BT02", title: "" });
            data.columns.unshift({ name: "BT01", title: "" });
          }
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let name: Cell = row.cells["NAME"];
              name = EnrichUtil.addObj(name, "", "", "");
              let state: Cell = row.cells["STATE"];
              state = EnrichUtil.addObj(state, "", "", "");
              let reay: Cell = row.cells["READY"];
              reay = EnrichUtil.addObj(reay, "", "", "");
              let ucred: Cell = row.cells["UNACKED"];
              ucred = EnrichUtil.addObj(ucred, "", "", "");
              let tot: Cell = row.cells["TOTAL"];
              tot = EnrichUtil.addObj(tot, "", "", "");
              let incoming: Cell = row.cells["INCOMING"];
              incoming = EnrichUtil.addObj(incoming, "", "", "");
              let deliver: Cell = row.cells["DELIVER"];
              deliver = EnrichUtil.addObj(deliver, "", "", "");
              let ack: Cell = row.cells["ACK"];
              ack = EnrichUtil.addObj(ack, "", "", "");

              // Buttons
              // Button 01
              var action = srv.path + "/frontend/hub/queuepurge/" + name.value;
              let button01: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button01 = EnrichUtil.setCellIcon(button01, "mdi mdi-broom", "");
              row.cells["BT01"] = button01;

              // Button 02
              var action = srv.path + "/frontend/hub/queuedelete/" + name.value;
              let button02: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button02 = EnrichUtil.setCellIcon(button02, "mdi mdi-delete", "");
              row.cells["BT02"] = button02;

              return row;
            });
          }
          resolve(data);
        });
    });
  }
}
