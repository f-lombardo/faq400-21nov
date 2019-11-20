import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

export default class Dashboard extends Service {
  private path: string = "/employees/dept/";

  async getList(deptID: string): Promise<any> {
    const srv = this;
    const moneyFunction = this.formatMoney;
    return new Promise(function(resolve, reject) {
      srv.doGet(srv.path + deptID).then((data: any) => {
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

  async OPERLIST(): Promise<any> {
    return this.getList("E11");
  }

  async MANULIST(): Promise<any> {
    return this.getList("D11");
  }

  async ADMILIST(): Promise<any> {
    return this.getList("D21");
  }

  async SOFTLIST(): Promise<any> {
    return this.getList("E21");
  }
}
