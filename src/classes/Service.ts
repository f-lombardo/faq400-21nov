import Vue from "vue";

export default class Service {
  protected async doGet(path: string): Promise<any> {
    return new Promise(function(resolve, reject) {
      Vue.prototype.$SmeUP.axiosInstance
        .get(path)
        .then((res: any) => {
          // eslint-disable-next-line
          console.log(res);
          resolve(res.data);
        })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error);
          reject(error);
        });
    });
  }
}
