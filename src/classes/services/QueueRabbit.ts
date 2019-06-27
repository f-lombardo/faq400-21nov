import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import { convertRows } from "@/assets/dist/types/components/kup-chart/kup-chart-builder";

export default class QueueRabbit extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/rabbitQueueList").then((data: any) => {
        if (data.rows) {
          data.rows = data.rows.map((row: any) => {
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
            return row;
          });
        }
        resolve(data);
      });
    });
  }
}
