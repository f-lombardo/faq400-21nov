import Vue from "vue";
import IMessage from "@/interfaces/IMessage";
import Message from "./Message";
import Fun from "@/classes/Fun";
import FunObject from "./FunObject";

export default class Service {
  fun: Fun;

  constructor(fun: Fun | null) {
    if (fun) {
      this.fun = fun;
    } else {
      this.fun = new Fun("F(;;)");
    }
  }
  public async doGet(path: string, configInstance?: boolean): Promise<any> {
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
    messages.forEach((rawMessage: IMessage) => {
      let message: Message = new Message(rawMessage);
      Vue.prototype.$messageManager.show(message);
    });
  }

  public getObjectCode(code: Number): String {
    this.fun.getObject(code);
    const objx: FunObject | null = this.fun.getObject(code);
    if (objx) {
      return objx.getMethod().replace(/\s+/g, "");
    }
    return "";
  }

  formatMoney(
    amount: any,
    decimalCount = 2,
    decimal = ".",
    thousands = ","
  ): any {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i: any = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j: any = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }
}
