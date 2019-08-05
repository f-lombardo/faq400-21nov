import Vue from "vue";
import IMessage from "@/interfaces/IMessage";
import Message from "./Message";

export default class Service {
  object1: String = "";

  constructor(obj1: String) {
    this.object1 = obj1;
  }
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

  private _showMessages(messages: IMessage[]): void {
    /*
    {
      "messages": [
        {
          "gravity": "INFO",
          "text": "All plugins are going to start",
          "fullText": "",
          "level": 50,
          "type": "INFO",
          "mode": "TN"
        }
      ]
    }
    */
    messages.forEach((rawMessage: IMessage) => {
      let message: Message = new Message(rawMessage);
      Vue.prototype.$messageManager.show(message);
    });
  }
}
