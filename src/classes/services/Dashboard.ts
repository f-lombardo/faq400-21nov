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
          data.rows.forEach((row: any) => {
            var cellActive = row.cells.ACTIVE;
            if (cellActive.value == "VO;COD_AGG;000012") {
              // TODO da mettere solo true
              cellActive.obj = { t: "J4", p: "ICO" };
              cellActive.value = "mdi mdi-brightness-1";
              cellActive.style = { color: "green" };
            }
            var cellReady = row.cells.READY;
            if (cellReady.value == "VO;COD_AGG;000012") {
              // TODO da mettere solo true
              cellReady.obj = { t: "J4", p: "ICO" };
              cellReady.value = "mdi mdi-brightness-1";
              cellReady.style = { color: "green" };
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
