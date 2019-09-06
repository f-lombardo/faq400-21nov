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
    /*
    const notifyExpr: RegExp = new RegExp(/NOTIFY\([^(]*\)/g);
    var funResult = notifyExpr.exec(fun);
    if (funResult) {
      const notifyResult = funResult[0];
      const notify = notifyResult.substring(
        notifyResult.indexOf("(") + 1,
        notifyResult.indexOf(")")
      );
      if (notify) {
        return notify;
      }
    }
    return "";
    */
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
    /**
  while ((funResult = objExpr.exec(fun)) !== null) {
    console.log("FunObject parser", funResult);
    //
    const objsSplitted = funResult[0].split("(");
    const code = parseInt(objsSplitted[0].trim(), 10);
    const codeSplitted = objsSplitted[1].split(";");
    const component = codeSplitted[0];
    const service = codeSplitted[1];
    const method = codeSplitted[2].slice(0, codeSplitted[2].length - 1);
    const triad = { component, service, method };
    objs.push(new FunObject(code, triad));
  }
  /**/
    return objs;
  }

  parseUISetup(fun: string): FunUIsetup | null {
    //https://stackoverflow.com/questions/2403122/regular-expression-to-extract-text-between-square-brackets
    var sgMatch = fun.match(new RegExp(/SG\((.*?)\)\)/g));
    if (sgMatch) {
      var block: string = sgMatch[0];
      var sg: string = block.substr(3, block.length - 4);
      //
      var slowF: string = this.parseBetweenBrackets("SlowF", sg);
      /*
      var slowFMatch = new RegExp(/SlowF\([^(]*\)/g).exec(sg); //confirmation required
      if (
        slowFMatch &&
        slowFMatch[0].substr(6, slowFMatch[0].length - 7) === "Yes"
      ) {
        var msg = "";
        var msgMatch = new RegExp(/Msg\([^(]*\)/g).exec(sg); //confirmation message
        if (msgMatch) {
          msg = msgMatch[0].substr(4, msgMatch[0].length - 5);
        }
        var msg2 = "";
        var msg2Match = new RegExp(/Msg2\([^(]*\)/g).exec(sg); //confirmation message 2
        if (msg2Match) {
          msg2 = msg2Match[0].substr(5, msg2Match[0].length - 6);
        }
        */
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
