import Triad from "@/classes/Triad";
import FunObject from "@/classes/FunObject";

export default class Fun {
  private triad: Triad = { service: "", method: "", component: "" };
  private objects: FunObject[] = [];

  constructor(fun: string) {
    //TODO ci sarà un fun parser o la creo qui dentro?
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
