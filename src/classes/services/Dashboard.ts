import Service from "@/classes/Service";
import EnrichUtil from "../utils/EnrichUtil";

// TODO REMOVE
import dataMock from "@/mocks/prova.json";

export default class Dashboard extends Service {
  private path: string = "/employees?workdept=";

  async OPERLIST(): Promise<any> {
    return new Promise(function(resolve, reject) {
      //srv.doGet(srv.path + "E11").then((data: any) => {
      resolve(dataMock);
    });
  }

  async MANULIST(): Promise<any> {
    return new Promise(function(resolve, reject) {
      //srv.doGet(srv.path + "D11").then((data: any) => {
      resolve(dataMock);
    });
  }

  async ADMILIST(): Promise<any> {
    return new Promise(function(resolve, reject) {
      //srv.doGet(srv.path + "D21").then((data: any) => {
      resolve(dataMock);
    });
  }

  async SOFTLIST(): Promise<any> {
    return new Promise(function(resolve, reject) {
      //srv.doGet(srv.path + "E21").then((data: any) => {
      resolve(dataMock);
    });
  }
}
