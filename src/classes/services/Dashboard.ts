import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class Dashboard extends Service {
  private path: string = "/gtw-hub/api/services";

  async DSHLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + "/frontend/hub/dashboard").then((data: any) => {
        if (data.columns) {
          data.columns.forEach((column: any) => {
            if (
              column.name == "£OAVON" ||
              column.name == "£OAVOT" ||
              column.name == "£OAVAT" ||
              column.name == "£OAVCT" ||
              column.name == "£OAVSI" ||
              column.name == "£OAVAU"
            ) {
              column.visible = false;
            }
            return column;
          });
        }

        if (data.rows) {
          data.rows.forEach((row: any) => {
            let cellSign: Cell = row.cells["£OAVIN"];
            cellSign = EnrichUtil.addObj(cellSign, "", "", "");
            let cellObj: Cell = row.cells["£OAVOT"];
            cellObj = EnrichUtil.addObj(cellObj, "", "", "");
            let cellVal: Cell = row.cells["£OAVOV"];
            if (cellObj) {
              cellVal = EnrichUtil.addObj(
                cellVal,
                cellObj.value.substr(0, 2),
                cellObj.value.substr(2, 12),
                ""
              );
            }
            let cellDec: Cell = row.cells["£OAVSI"];
            cellDec = EnrichUtil.addObj(cellDec, "", "", "");
            let number: Cell = row.cells["£OAVON"];
            number = EnrichUtil.addObj(number, "", "", "");
            let cellNum: Cell = row.cells["£OAVAT"];
            cellNum = EnrichUtil.addObj(cellNum, "", "", "");
            let cellCat: Cell = row.cells["£OAVCT"];
            cellCat = EnrichUtil.addObj(cellCat, "", "", "");
            let cellOu: Cell = row.cells["£OAVAU"];
            cellOu = EnrichUtil.addObj(cellOu, "", "", "");

            return row;
          });
        }
        resolve(data);
      });
    });
  }

  async MCRSRVLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/hub/microserviceList")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let cellId: Cell = row.cells["IDMIC"];
              cellId = EnrichUtil.addObj(cellId, "", "", "");
              let cellDebug: Cell = row.cells["DEBUG"];
              cellDebug = EnrichUtil.addObj(cellDebug, "J1", "URL", "");
              let cellActive: Cell = row.cells["ACTIVE"];
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
              let cellReady: Cell = row.cells["READY"];
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
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/hub/a37MicroserviceList")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let cellId: Cell = row.cells["IDMIC"];
              cellId = EnrichUtil.addObj(cellId, "", "", "");
              let cellDebug: Cell = row.cells["DEBUG"];
              cellDebug = EnrichUtil.addObj(cellDebug, "J1", "URL", "");
              let cellActive: Cell = row.cells["ACTIVE"];
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
              let cellReady: Cell = row.cells["READY"];
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

  async A38LIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/hub/a38MicroserviceList")
        .then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let cellId: Cell = row.cells["IDMIC"];
              cellId = EnrichUtil.addObj(cellId, "", "", "");
              let cellDebug: Cell = row.cells["DEBUG"];
              cellDebug = EnrichUtil.addObj(cellDebug, "J1", "URL", "");
              let cellActive: Cell = row.cells["ACTIVE"];
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
              let cellReady: Cell = row.cells["READY"];
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
}
