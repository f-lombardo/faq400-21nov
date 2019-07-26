import Triad from "@/classes/Triad";
import FunObject from "@/classes/FunObject";

export default class Fun {
  private triad: Triad;
  private objects: FunObject[];
  private notify: string | null = null;

  constructor(fun: string) {
    const funExpr: RegExp = new RegExp(/F\((.*?)\)/);
    const objExpr: RegExp = new RegExp(/\d\([^(]*\)/g);
    const notifyExpr: RegExp = new RegExp(/NOTIFY\([^(]*\)/g);
    var funResult = funExpr.exec(fun);
    var triad: Triad;
    // F
    if (funResult) {
      const triadResult: string[] = funResult[1].split(";");
      triad = {
        component: triadResult[0],
        service: triadResult[1],
        method: triadResult[2]
      };
    } else {
      triad = {
        component: "",
        service: "",
        method: ""
      };
    }
    this.triad = triad;
    // Objects
    var objs: FunObject[] = [];
    while ((funResult = objExpr.exec(fun)) !== null) {
      const objsSplitted = funResult[0].split("(");
      const code = parseInt(objsSplitted[0], 10);
      const codeSplitted = objsSplitted[1].split(";");
      const component = codeSplitted[0];
      const service = codeSplitted[1];
      const method = codeSplitted[2].slice(0, codeSplitted[2].length - 1);
      const triad = { component, service, method };
      objs.push(new FunObject(code, triad));
    }
    this.objects = objs;
    // Notify
    funResult = notifyExpr.exec(fun);
    if (funResult) {
      const notifyResult = funResult[0];
      const notify = notifyResult.substring(
        notifyResult.indexOf("(") + 1,
        notifyResult.indexOf(")")
      );
      if (notify) {
        this.notify = notify;
      }
    }
  }

  isServiceExternal(): boolean {
    if (this.triad.service === "*SCO") return true;
    return false;
  }

  isVoid(): boolean {
    if (this.triad.component === "FBK") return true;
    return false;
  }

  getComponent(): string {
    return this.triad.component;
  }

  getService(): string {
    return this.triad.service;
  }

  getMethod(): string {
    return this.triad.method;
  }

  getObjects(): FunObject[] {
    return this.objects;
  }

  getObject(code: Number): FunObject | null {
    var obj;
    for (let index = 0; index < this.objects.length; index++) {
      obj = this.objects[index];
      if (obj.getCode() === code) {
        return obj;
      }
    }
    return null;
  }

  getNotify(): string | null {
    return this.notify;
  }
}
