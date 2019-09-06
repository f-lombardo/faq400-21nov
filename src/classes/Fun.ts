import Triad from "@/classes/Triad";
import FunObject from "@/classes/FunObject";
import FunUIsetup from "./FunUISetup";

export default class Fun {
  private triad: Triad;
  private objects: FunObject[];
  private notify: string | null = null;
  private uiSetup: FunUIsetup | null = null;

  constructor(fun: string) {
    console.log("Fun constructor", fun);
    // F
    this.triad = this.parseTriad(fun);
    // Objects
    this.objects = this.parseObjects(fun);
    // Notify
    this.notify = this.parseNotify(fun);
    //Setup Grafico
    this.uiSetup = this.parseUISetup(fun);

    console.log("Fun constructed", this);
  }

  parseTriad(fun: string): Triad {
    const funExpr: RegExp = new RegExp(/F\((.*?)\)/);
    var funResult = funExpr.exec(fun);
    var triad: Triad;
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
    return triad;
  }

  parseNotify(fun: string): string {
    return this.parseBetweenBrackets("NOTIFY", fun);
  }

  parseObjects(fun: string): FunObject[] {
    const objExpr: RegExp = new RegExp(/\s\d\([^(]*\)/g); //space+digit otherwise match also Msg2()
    /**/
    var objs: FunObject[] = [];
    var objectsMatch = fun.match(objExpr);
    if (objectsMatch) {
      objectsMatch.forEach(element => {
        console.log("FunObject:", element);
        //
        const objsSplitted = element.split("(");
        const code = parseInt(objsSplitted[0].trim(), 10); //remove space
        const codeSplitted = objsSplitted[1].split(";");
        const component = codeSplitted[0];
        const service = codeSplitted[1];
        const method = codeSplitted[2].slice(0, codeSplitted[2].length - 1);
        const triad = { component, service, method };
        objs.push(new FunObject(code, triad));
      });
    }
    return objs;
  }

  parseUISetup(fun: string): FunUIsetup | null {
    //https://stackoverflow.com/questions/2403122/regular-expression-to-extract-text-between-square-brackets
    //https://developer.mozilla.org/it/docs/Web/JavaScript/Guida/Espressioni_Regolari
    var sgMatch = fun.match(new RegExp(/SG\((.*?)\)\)/g));
    if (sgMatch) {
      var block: string = sgMatch[0];
      var sg: string = block.substr(3, block.length - 4);
      //
      var slowF: string = this.parseBetweenBrackets("SlowF", sg);
      if (slowF) {
        var msg: string = this.parseBetweenBrackets("Msg", sg);
        var msg2: string = this.parseBetweenBrackets("Msg2", sg);
        return new FunUIsetup()
          .setConfirmationRequired(true)
          .setMsg(msg)
          .setMsg2(msg2);
      }
    }
    //
    return null;
  }

  parseBetweenBrackets(key: string, string: string): string {
    //i.e. key="Msg", string="Msg(prova)"
    var match = new RegExp(key + "\\([^(]*\\)").exec(string);
    if (match) {
      return match[0].substr(key.length + 1, match[0].length - key.length - 2);
    }
    return "";
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

  getUISetup(): FunUIsetup | null {
    return this.uiSetup;
  }
}
