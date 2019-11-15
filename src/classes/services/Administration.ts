import Service from "@/classes/Service";

// TODO REMOVE
import dataMock from "@/mocks/prova.json";

export default class Dashboard extends Service {
  private path: string = "/employees?workdept=D21";

  async LIST(): Promise<any> {
    return new Promise(function(resolve, reject) {
      //srv.doGet(srv.path).then((data: any) => {
      resolve(dataMock);
    });
  }
}
