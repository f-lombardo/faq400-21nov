import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";
import FunObject from "../FunObject";
export default class A37Plugins extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/deployer/a37PluginList")
        .then((data: any) => {
          if (data.columns) {
            data.columns.unshift({ name: "BT05", title: "" });
            data.columns.unshift({ name: "BT04", title: "" });
            data.columns.unshift({ name: "BT03", title: "" });
            data.columns.unshift({ name: "BT02", title: "" });
            data.columns.unshift({ name: "BT01", title: "" });
            data.columns.forEach((column: any) => {
              if (column.name == "ARTIF" || column.name == "VERS") {
                column.visible = false;
              }
              return column;
            });
          }

          if (data.rows) {
            data.rows.forEach((row: any) => {
              let plg: Cell = row.cells["CONF"];
              plg = EnrichUtil.addObj(plg, "", "", "");
              let txt: Cell = row.cells["TEXT"];
              txt = EnrichUtil.addObj(txt, "", "", "");
              let art: Cell = row.cells["ARTIF"];
              art = EnrichUtil.addObj(art, "", "", "");
              let version: Cell = row.cells["VERS"];
              version = EnrichUtil.addObj(version, "", "", "");
              let status: Cell = row.cells["STATUS"];
              status = EnrichUtil.addObj(status, "J4", "ICO", "");
              if (status.value == "true") {
                status = EnrichUtil.setCellIcon(
                  status,
                  "mdi mdi-brightness-1",
                  "green"
                );
              } else {
                status = EnrichUtil.setCellIcon(
                  status,
                  "mdi mdi-brightness-1",
                  "red"
                );
              }
              let on: Cell = row.cells["ONLINE"];
              on = EnrichUtil.addObj(on, "J4", "ICO", "");
              if (on.value == "true") {
                on = EnrichUtil.setCellIcon(
                  on,
                  "mdi mdi-brightness-1",
                  "green"
                );
              } else {
                on = EnrichUtil.setCellIcon(on, "mdi mdi-brightness-1", "red");
              }
              let ready: Cell = row.cells["READY"];
              ready = EnrichUtil.addObj(ready, "J4", "ICO", "");
              if (ready.value == "true") {
                ready = EnrichUtil.setCellIcon(
                  ready,
                  "mdi mdi-brightness-1",
                  "green"
                );
              } else {
                ready = EnrichUtil.setCellIcon(
                  ready,
                  "mdi mdi-brightness-1",
                  "red"
                );
              }
              let file: Cell = row.cells["WAR"];
              file = EnrichUtil.addObj(file, "J4", "ICO", "");
              if (file.value == "true") {
                file = EnrichUtil.setCellIcon(
                  file,
                  "mdi mdi-brightness-1",
                  "green"
                );
              } else {
                file = EnrichUtil.setCellIcon(
                  file,
                  "mdi mdi-brightness-1",
                  "red"
                );
              }
              let dexter: Cell = row.cells["EXT"];
              dexter = EnrichUtil.addObj(dexter, "V2", "SI/NO", dexter.value);
              let del: Cell = row.cells["DELO"];
              del = EnrichUtil.addObj(del, "V2", "SI/NO", del.value);

              // Buttons
              // Button 01
              let button01: Cell = {
                value: "Start plugin",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A37;STARTPLG) 1(;;[CONF]) NOTIFY(TITA37)"
                },
                config: { showtext: false, icon: "mdi mdi-play" }
              };
              row.cells["BT01"] = button01;

              // Button 02
              let button02: Cell = {
                value: "Stop plugin",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A37;STOPPLG) 1(;;[CONF]) NOTIFY(TITA37)"
                },
                config: { showtext: false, icon: "mdi mdi-stop" }
              };
              row.cells["BT02"] = button02;

              // Button 03
              let button03: Cell = {
                value: "Refresh configuration plugin",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A37;REFRESHPLG) 1(;;[CONF]) NOTIFY(TITA37)"
                },
                config: { showtext: false, icon: "mdi mdi-refresh" }
              };
              row.cells["BT03"] = button03;

              // Button 04
              let button04: Cell = {
                value: "Create plugin from template",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A37;CREATEPLG) 1(;;[CONF]) NOTIFY(TITA37)"
                },
                config: { showtext: false, icon: "mdi mdi-plus-circle-outline" }
              };
              row.cells["BT04"] = button04;

              // Button 05
              let button05: Cell = {
                value: "Create plugin from template",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A37;DELETEPLG) 1(;;[CONF]) NOTIFY(TITA37)"
                },
                config: { showtext: false, icon: "mdi mdi-delete" }
              };
              row.cells["BT05"] = button05;

              return row;
            });
          }
          resolve(data);
        });
    });
  }

  async StartAll(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/deployer/a37DeployAll")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async StopAll(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/deployer/a37UndeployAll")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async UpdateAllConfigurations(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/config/a37updateAllConfigs")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async DeleteAllConfigurations(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/config/a37deleteAllConfigs")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async CreateAllPlugins(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/deployer/a37CreateAllPlugins")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async DeleteAllPlugins(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(srv.path + "/frontend/deployer/a37DeleteAllPlugins")
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  // Rows buttons

  async STARTPLG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        let k1: String = "";
        let obj1: FunObject | null = srv.fun.getObject(1);
        if (obj1) {
          k1 = obj1.getMethod();
        }
        srv
          .doGet(srv.path + "/frontend/deployer/a37deploy/" + k1)
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async STOPPLG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(
            srv.path + "/frontend/deployer/a37undeploy/" + srv.getObjectCode(1)
          )
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async REFRESHPLG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(
            srv.path + "/frontend/deployer/a37refresh/" + srv.getObjectCode(1)
          )
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async CREATEPLG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(
            srv.path +
              "/frontend/deployer/a37createFromTemplate/" +
              srv.getObjectCode(1)
          )
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }

  async DELETEPLG(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      if (confirm("Are you sure?")) {
        srv
          .doGet(
            srv.path +
              "/frontend/deployer/a37deletePlugin/" +
              srv.getObjectCode(1)
          )
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }
}
