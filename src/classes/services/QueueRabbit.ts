import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import { convertRows } from "@/assets/dist/types/components/kup-chart/kup-chart-builder";
import UIMsg from "../utils/UIMsg";

export default class QueueRabbit extends Service {
  private static PATH: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(QueueRabbit.PATH + "/frontend/hub/rabbitQueueList")
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
              let button01: Cell = {
                value: "Purge queue",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k:
                    "F(FBK;RABBIT;PURGEQUEUE) 1(;;[NAME]) SG(SlowF(Yes) Msg(" +
                    UIMsg.MSG_CONFIRM +
                    ")) NOTIFY(TITRAB)"
                },
                config: { showtext: false, icon: "mdi mdi-broom" }
              };
              row.cells["BT01"] = button01;

              // Button 02
              let button02: Cell = {
                value: "Delete queue",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k:
                    "F(FBK;RABBIT;DELETEQUEUE) 1(;;[NAME]) SG(SlowF(Yes) Msg(" +
                    UIMsg.MSG_CONFIRM +
                    ")) NOTIFY(TITRAB)"
                },
                config: { showtext: false, icon: "mdi mdi-delete" }
              };
              row.cells["BT02"] = button02;

              return row;
            });
          }
          resolve(data);
        });
    });
  }

  async PURGEQUEUE(): Promise<any> {
    return this.doGet(
      QueueRabbit.PATH + "/frontend/hub/queuepurge/" + this.getObjectCode(1)
    );
  }

  async DELETEQUEUE(): Promise<any> {
    return this.doGet(
      QueueRabbit.PATH + "/frontend/hub/queuedelete/" + this.getObjectCode(1)
    );
  }
}
