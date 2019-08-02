import Vue from "vue";

export default class Service {
  protected async doGet(path: string, configInstance?: boolean): Promise<any> {
    const service = this;
    const axiosInstance = configInstance
      ? Vue.prototype.$SmeUP.axiosConfigInstance
      : Vue.prototype.$SmeUP.axiosInstance;
    return new Promise(function(resolve, reject) {
      axiosInstance
        .get(path)
        .then((res: any) => {
          // eslint-disable-next-line
          console.log(res);
          if (res.data.messages) {
            service._showMessages(res.data.messages);
          }
          resolve(res.data);
        })
        .catch((error: any) => {
          // eslint-disable-next-line
          console.log(error);
          reject(error);
        });
    });
  }

  // TODO refactorizzare
  private _showMessages(messages: any): void {
    // TODO message non dev'essere any, creare apposita interfaccia
    messages.forEach((message: any) => {
      // TODO gestire tutte le proprietà di message, non solo text
      Vue.prototype.$messageManager.show(message.text);
    });
  }
}
