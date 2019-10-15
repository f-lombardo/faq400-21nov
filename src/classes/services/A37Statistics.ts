import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import UIMsg from "../utils/UIMsg";

export default class A37Statistics extends Service {
  private static PATH: string = "/gtw-hub/api/services";

  async NOWLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(A37Statistics.PATH + "/frontend/hub/statisticsListNow")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let time: Cell = row.cells["TIME"];
              time = EnrichUtil.addObj(time, "", "", "");

              let incom: Cell = row.cells["IN"];
              incom = EnrichUtil.addObj(incom, "NR", "", "");

              let cons: Cell = row.cells["CONS"];
              cons = EnrichUtil.addObj(cons, "NR", "", "");

              let out: Cell = row.cells["OUT"];
              out = EnrichUtil.addObj(out, "NR", "", "");

              let err: Cell = row.cells["ERR"];
              err = EnrichUtil.addObj(err, "NR", "", "");

              let queue: Cell = row.cells["QUEUE"];
              queue = EnrichUtil.addObj(queue, "NR", "", "");

              let evtTime: Cell = row.cells["EVTTIME"];
              evtTime = EnrichUtil.addObj(evtTime, "NR", "", "");

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
        .doGet(A37Statistics.PATH + "/frontend/hub/statisticsList")
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

  async CHARTLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(A37Statistics.PATH + "/frontend/hub/statisticsList")
        .then((data: any) => {
          var num = 0;
          if (data.rows) {
            data.rows.forEach((row: any) => {
              num++;
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
              evtTime = EnrichUtil.addObj(
                evtTime,
                "NR",
                "",
                evtTime.value.replace(",", ".")
              );

              return row;
            });
          }

          if (num === 0) {
            data.rows = [
              {
                cells: {
                  TIME: { value: "" },
                  IN: { value: "" },
                  CONS: { value: "" },
                  OUT: { value: "" },
                  ERR: { value: "" },
                  QUEUE: { value: "" },
                  EVTTIME: { value: "" }
                }
              }
            ];
          }
          resolve(data);
        });
    });
  }

  async ClearAllStatistics(): Promise<any> {
    return this.doGet(A37Statistics.PATH + "/frontend/hub/clearStatistics");
  }
}
