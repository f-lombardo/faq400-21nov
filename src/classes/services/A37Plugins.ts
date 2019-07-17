import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

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
              dexter = EnrichUtil.addObj(dexter, "", "", "");
              let del: Cell = row.cells["DELO"];
              del = EnrichUtil.addObj(del, "", "", "");

              // Buttons
              // Button 01
              var action =
                srv.path + "/frontend/deployer/a37deploy/" + plg.value;

              let button01: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button01 = EnrichUtil.setCellIcon(button01, "mdi mdi-play", "");
              row.cells["BT01"] = button01;

              // Button 02
              var action =
                srv.path + "/frontend/deployer/a37undeploy/" + plg.value;
              let button02: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button02 = EnrichUtil.setCellIcon(button02, "mdi mdi-stop", "");
              row.cells["BT02"] = button02;

              // Button 03
              var action =
                srv.path + "/frontend/deployer/a37refresh/" + plg.value;
              let button03: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button03 = EnrichUtil.setCellIcon(
                button03,
                "mdi mdi-refresh",
                ""
              );
              row.cells["BT03"] = button03;

              // Button 04
              var action =
                srv.path +
                "/frontend/deployer/a37createFromTemplate/" +
                plg.value;
              let button04: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button04 = EnrichUtil.setCellIcon(
                button04,
                "mdi mdi-plus-circle-outline",
                ""
              );
              row.cells["BT04"] = button04;

              // Button 05
              var action =
                srv.path + "/frontend/deployer/a37deletePlugin/" + plg.value;
              let button05: Cell = {
                value: "",
                obj: { t: "J4", p: "ICO", k: "" }
              };
              button05 = EnrichUtil.setCellIcon(button05, "mdi mdi-delete", "");
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
}
