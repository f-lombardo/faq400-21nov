import Triad from "@/classes/Triad";

export default class FunObject {
  private triad: Triad = { service: "", method: "", component: "" };
  private code: Number;

  constructor(code: Number, obj: any) {
    this.code = code;
    this.triad.component = obj.component;
    this.triad.service = obj.service;
    this.triad.method = obj.method;
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

  getCode(): Number {
    return this.code;
  }
}
