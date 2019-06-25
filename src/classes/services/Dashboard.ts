import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class Dashboard extends Service {
  private path: string = "/gtw-hub/api/services";

  async DSHLIST(): Promise<any> {
    return this.doGet(this.path + "/dashboard");
  }

  async MCRSRVLIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/microserviceList").then((data: any) => {
        if (data.rows) {
          data.rows = data.rows.map((row: any) => {
            let cellId: Cell = row.cells.IDMIC;
            cellId = EnrichUtil.addObj(cellId, "", "", "");
            let cellDebug: Cell = row.cells.DEBUG;
            cellDebug = EnrichUtil.addObj(cellDebug, "", "", "");
            let cellActive: Cell = row.cells.ACTIVE;
            cellActive = EnrichUtil.addObj(cellActive, "J4", "ICO", "");
            if (cellActive.value == "true") {
              cellActive = EnrichUtil.setCellIcon(
                cellActive,
                "mdi mdi-brightness-1",
                "green"
              );
            } else {
              cellActive = EnrichUtil.setCellIcon(
                cellActive,
                "mdi mdi-brightness-1",
                "red"
              );
            }
            let cellReady: Cell = row.cells.READY;
            cellReady = EnrichUtil.addObj(cellReady, "J4", "ICO", "");
            if (cellReady.value == "true") {
              cellReady = EnrichUtil.setCellIcon(
                cellReady,
                "mdi mdi-brightness-1",
                "green"
              );
            } else {
              cellReady = EnrichUtil.setCellIcon(
                cellReady,
                "mdi mdi-brightness-1",
                "red"
              );
            }
            return row;
          });
        }
        resolve(data);
      });
    });
  }

  async A37LIST(): Promise<any> {
    return this.doGet(this.path + "/a37MicroserviceList");
  }

  async A38LIST(): Promise<any> {
    return this.doGet(this.path + "/a38MicroserviceList");
  }
}
