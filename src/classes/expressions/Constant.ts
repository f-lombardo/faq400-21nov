import SubExpression from "./SubExpression";

import IVariableContext from "@/interfaces/IVariableContext";

export default class Constant implements SubExpression {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  evaluate(context: IVariableContext): string {
    return this.value;
  }
}
