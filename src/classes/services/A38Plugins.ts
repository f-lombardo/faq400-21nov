import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class A38Plugins extends Service {
  private path: string = "/gtw-hub/api/services";

  async LIST(): Promise<any> {
    var srv = this;
    return new Promise(function(resolve, reject) {
      srv
        .doGet(srv.path + "/frontend/deployer/a38PluginList")
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
              let del: Cell = row.cells["DELO"];
              del = EnrichUtil.addObj(del, "V2", "SI/NO", del.value);

              // Buttons
              // Button 01
              let button01: Cell = {
                value: "Start plugin",
                obj: {
                  t: "J4",
                  p: "BTN",
                  k: "F(FBK;A38;STARTPLG) 1(;;[CONF]) NOTIFY(TITA38)"
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
                  k: "F(FBK;A38;STOPPLG) 1(;;[CONF]) NOTIFY(TITA38)"
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
                  k: "F(FBK;A38;REFRESHPLG) 1(;;[CONF]) NOTIFY(TITA38)"
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
                  k: "F(FBK;A38;CREATEPLG) 1(;;[CONF]) NOTIFY(TITA38)"
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
                  k: "F(FBK;A38;DELETEPLG) 1(;;[CONF]) NOTIFY(TITA38)"
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
          .doGet(srv.path + "/frontend/deployer/a38DeployAll")
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
          .doGet(srv.path + "/frontend/deployer/a38UndeployAll")
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
          .doGet(srv.path + "/frontend/config/a38updateAllConfigs")
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
          .doGet(srv.path + "/frontend/config/a38deleteAllConfigs")
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
          .doGet(srv.path + "/frontend/deployer/a38CreateAllPlugins")
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
          .doGet(srv.path + "/frontend/deployer/a38DeleteAllPlugins")
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
        srv
          .doGet(srv.path + "/frontend/deployer/a38deploy/" + srv.object1)
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
          .doGet(srv.path + "/frontend/deployer/a38undeploy/" + srv.object1)
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
          .doGet(srv.path + "/frontend/deployer/a38refresh/" + srv.object1)
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
            srv.path + "/frontend/deployer/a38createFromTemplate/" + srv.object1
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
          .doGet(srv.path + "/frontend/deployer/a38deletePlugin/" + srv.object1)
          .then((data: any) => {
            resolve(data);
          });
      }
    });
  }
}
