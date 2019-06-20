import Service from "@/classes/Service";

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
            cellId.obj = { t: "", p: "", k: "" };
            let cellDebug: Cell = row.cells.DEBUG;
            cellDebug.obj = { t: "J1", p: "URL", k: "" };
            let cellActive: Cell = row.cells.ACTIVE;
            cellActive.obj = { t: "J4", p: "ICO", k: "" };
            if (cellActive.value == "true") {
              cellActive.value = "mdi mdi-brightness-1";
              cellActive.style = { color: "green" };
            } else {
              cellActive.style = { color: "red" };
            }
            let cellReady: Cell = row.cells.READY;
            cellReady.obj = { t: "J4", p: "ICO", k: "" };
            if (cellReady.value == "true") {
              cellReady.value = "mdi mdi-brightness-1";
              cellReady.style = { color: "green" };
            } else {
              cellReady.style = { color: "red" };
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
