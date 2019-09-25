import SubExpression from "./SubExpression";
import IVariableContext from "@/interfaces/IVariableContext";

export default class Variable implements SubExpression {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  evaluate(context: IVariableContext): string {
    return context.variables[this.value];
  }
}
