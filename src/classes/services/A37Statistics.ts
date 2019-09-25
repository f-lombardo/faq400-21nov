import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import UIMsg from "../utils/UIMsg";

export default class TemplatesList extends Service {
  private static PATH: string = "/gtw-hub/api/services";

  async NOWLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(TemplatesList.PATH + "/frontend/hub/statisticsListNow")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let time: Cell = row.cells["TIME"];
              time = EnrichUtil.addObj(time, "", "", "");

              let incom: Cell = row.cells["IN"];
              incom = EnrichUtil.addObj(incom, "", "", "");

              let cons: Cell = row.cells["CONS"];
              cons = EnrichUtil.addObj(cons, "", "", "");

              let out: Cell = row.cells["OUT"];
              out = EnrichUtil.addObj(out, "", "", "");

              let err: Cell = row.cells["ERR"];
              err = EnrichUtil.addObj(err, "", "", "");

              let queue: Cell = row.cells["QUEUE"];
              queue = EnrichUtil.addObj(queue, "", "", "");

              let evtTime: Cell = row.cells["EVTTIME"];
              evtTime = EnrichUtil.addObj(evtTime, "", "", "");

              return row;
            });
          }
          resolve(data);
        });
    });
  }

  async DATALIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(TemplatesList.PATH + "/frontend/hub/statisticsList")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let time: Cell = row.cells["TIME"];
              time = EnrichUtil.addObj(time, "", "", time.value);

              let incom: Cell = row.cells["IN"];
              incom = EnrichUtil.addObj(incom, "NR", "", incom.value);

              let cons: Cell = row.cells["CONS"];
              cons = EnrichUtil.addObj(cons, "NR", "", cons.value);

              let out: Cell = row.cells["OUT"];
              out = EnrichUtil.addObj(out, "NR", "", out.value);

              let err: Cell = row.cells["ERR"];
              err = EnrichUtil.addObj(err, "NR", "", err.value);

              let queue: Cell = row.cells["QUEUE"];
              queue = EnrichUtil.addObj(queue, "NR", "", queue.value);

              let evtTime: Cell = row.cells["EVTTIME"];
              evtTime = EnrichUtil.addObj(evtTime, "NR", "", evtTime.value);

              return row;
            });
          }
          resolve(data);
        });
    });
  }
}
