import Triad from "@/classes/Triad";
import FunObject from "@/classes/FunObject";

export default class Fun {
  private triad: Triad = { service: "", method: "", component: "" };
  private objects: FunObject[] = [];

  constructor(fun: string) {
    //TODO ci sarà un fun parser o la creo qui dentro?
    //fun.indexOf("");
    //https://developer.mozilla.org/it/docs/Web/JavaScript/Guida/Espressioni_Regolari
    //https://flaviocopes.com/javascript-regular-expressions/
    /*
    let expr: RegExp = new RegExp(/F\((.*?)\)/);
    var result = expr.exec("fun"); //RegExpExecArray
    console.log(result);
    if (result) {
      const matchIndex = result.index;
      var first: RegExpExecArray = result[0];
      console.log(result[0]);
      const firstText = first.toString;
      const t = first.length;
      //console.log(new RegRange(matchIndex, t));
    }
    */
  }

  isServiceInternal(): boolean {
    if (this.triad.service === "*SCO") return true;
    return false;
  }

  getComponent(): String {
    return this.triad.component;
  }

  getService(): String {
    return this.triad.service;
  }

  getMethod(): String {
    return this.triad.method;
  }

  getObjects(): FunObject[] {
    return this.objects;
  }

  getObject(code: Number) {
    this.objects.forEach(obj => {
      if (obj.getCode() === code) return obj;
    });
    return null;
  }
}
