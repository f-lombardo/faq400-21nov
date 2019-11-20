import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

import skeleton from "@/mocks/DeptChartSkeleton.json";
import { baseData } from "@/mocks/GenderChartSkeleton";

export default class All extends Service {
  private path: string = "/employees";

  async LIST(): Promise<any> {
    const srv = this;
    const moneyFunction = this.formatMoney;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path).then((data: any) => {
        if (data.rows) {
          data.rows.forEach((row: any) => {
            let salary: Cell = row.cells["SALARY"];
            salary.value = "€" + moneyFunction(salary.value);
            salary = EnrichUtil.addObj(salary, "NR", "", "");
            let gender: Cell = row.cells["GENDER"];
            gender = EnrichUtil.addObj(gender, "J4", "ICO", "");
            if (gender.value == "F") {
              gender = EnrichUtil.setCellIcon(
                gender,
                "mdi mdi-gender-female",
                "pink"
              );
            } else if (gender.value == "M") {
              gender = EnrichUtil.setCellIcon(
                gender,
                "mdi mdi-gender-male",
                "blue"
              );
            } else {
              gender = EnrichUtil.setCellIcon(
                gender,
                "mdi mdi-gender-transgender",
                "red"
              );
            }
          });
        }
        resolve(data);
      });
    });
  }

  async CHARTLIST(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      let manuValue = "0";
      let operValue = "0";
      let swValue = "0";
      let adminValue = "0";
      srv.doGet(srv.path + "/dept/D11").then((data: any) => {
        if (data.rows) {
          manuValue = data.rows.length;
        }
        srv.doGet(srv.path + "/dept/E11").then((data: any) => {
          if (data.rows) {
            operValue = data.rows.length;
          }
          srv.doGet(srv.path + "/dept/E21").then((data: any) => {
            if (data.rows) {
              swValue = data.rows.length;
            }
            srv.doGet(srv.path + "/dept/D21").then((data: any) => {
              if (data.rows) {
                adminValue = data.rows.length;
              }
              var num = 0;
              if (skeleton.rows) {
                skeleton.rows.forEach((row: any) => {
                  num++;
                  let time: Cell = row.cells["TIME"];
                  time = EnrichUtil.addObj(time, "", "", time.value);

                  let oper: Cell = row.cells["OPER"];
                  oper = EnrichUtil.addObj(oper, "NR", "", operValue);

                  let manu: Cell = row.cells["MANU"];
                  manu = EnrichUtil.addObj(manu, "NR", "", manuValue);

                  let admin: Cell = row.cells["ADMIN"];
                  admin = EnrichUtil.addObj(admin, "NR", "", adminValue);

                  let sw: Cell = row.cells["SW"];
                  sw = EnrichUtil.addObj(sw, "NR", "", swValue);

                  return row;
                });
              }
              if (num === 0) {
                skeleton.rows = [
                  {
                    cells: {
                      TIME: { value: "Employees for Department" },
                      OPER: { value: 0 },
                      MANU: { value: 0 },
                      ADMIN: { value: 0 },
                      SW: { value: 0 }
                    }
                  }
                ];
              }
              resolve(skeleton);
            });
          });
        });
      });
    });
  }

  async CHARTGENDER(): Promise<any> {
    const srv = this;
    return new Promise(function(resolve, reject) {
      let maleValue: number = 0;
      let femaleValue: number = 0;
      let otherValue: number = 0;
      srv.doGet(srv.path + "/dept/D11").then((data: any) => {
        if (data.rows) {
          data.rows.forEach((row: any) => {
            let gender: Cell = row.cells["GENDER"];
            if (gender.value == "F") {
              femaleValue = femaleValue + 1;
            } else if (gender.value == "M") {
              maleValue = maleValue + 1;
            } else {
              otherValue = otherValue + 1;
            }
          });
        }
        srv.doGet(srv.path + "/dept/E11").then((data: any) => {
          if (data.rows) {
            data.rows.forEach((row: any) => {
              let gender: Cell = row.cells["GENDER"];
              if (gender.value == "F") {
                femaleValue = femaleValue + 1;
              } else if (gender.value == "M") {
                maleValue = maleValue + 1;
              } else {
                otherValue = otherValue + 1;
              }
            });
          }
          srv.doGet(srv.path + "/dept/E21").then((data: any) => {
            if (data.rows) {
              data.rows.forEach((row: any) => {
                let gender: Cell = row.cells["GENDER"];
                if (gender.value == "F") {
                  femaleValue = femaleValue + 1;
                } else if (gender.value == "M") {
                  maleValue = maleValue + 1;
                } else {
                  otherValue = otherValue + 1;
                }
              });
            }
            srv.doGet(srv.path + "/dept/D21").then((data: any) => {
              if (data.rows) {
                data.rows.forEach((row: any) => {
                  let gender: Cell = row.cells["GENDER"];
                  if (gender.value == "F") {
                    femaleValue = femaleValue + 1;
                  } else if (gender.value == "M") {
                    maleValue = maleValue + 1;
                  } else {
                    otherValue = otherValue + 1;
                  }
                });
              }
              var num = 0;
              if (baseData.rows) {
                baseData.rows[0] = {
                  cells: {
                    Col1: {
                      obj: {
                        t: "",
                        p: "",
                        k: "MALE"
                      },
                      value: "MALE"
                    },
                    Col2: {
                      obj: {
                        t: "NR",
                        p: "",
                        k: String(maleValue)
                      },
                      value: String(maleValue)
                    }
                  }
                };
                baseData.rows[1] = {
                  cells: {
                    Col1: {
                      obj: {
                        t: "",
                        p: "",
                        k: "FEMALE"
                      },
                      value: "FEMALE"
                    },
                    Col2: {
                      obj: {
                        t: "NR",
                        p: "",
                        k: String(femaleValue)
                      },
                      value: String(femaleValue)
                    }
                  }
                };
                baseData.rows[2] = {
                  cells: {
                    Col1: {
                      obj: {
                        t: "",
                        p: "",
                        k: "OTHER"
                      },
                      value: "OTHER"
                    },
                    Col2: {
                      obj: {
                        t: "NR",
                        p: "",
                        k: String(otherValue)
                      },
                      value: String(otherValue)
                    }
                  }
                };
              }
              resolve(baseData);
            });
          });
        });
      });
    });
  }
}
