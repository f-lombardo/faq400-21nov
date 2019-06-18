import Service from "@/classes/Service";
import Cell from "@/classes/Cell";

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
          data.rows.forEach((row: any) => {
            var cellId: Cell = row.cells.IDMIC;
            cellId.obj = { t: "", p: "" };
            var cellDebug = row.cells.DEBUG;
            cellDebug.obj = { t: "J1", p: "URL" };
            var cellActive = row.cells.ACTIVE;
            cellActive.obj = { t: "J4", p: "ICO" };
            if (cellActive.value == "VO;COD_AGG;000012") {
              cellActive.value = "mdi mdi-brightness-1";
              // TODO da mettere solo true
              cellActive.style = { color: "green" };
            } else {
              cellActive.style = { color: "red" };
            }
            var cellReady = row.cells.READY;
            cellReady.obj = { t: "J4", p: "ICO" };
            if (cellReady.value == "VO;COD_AGG;000012") {
              cellReady.value = "mdi mdi-brightness-1";
              // TODO da mettere solo true
              cellReady.style = { color: "green" };
            } else {
              cellReady.style = { color: "red" };
            }
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
