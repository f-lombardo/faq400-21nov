import IVariableContext from "@/interfaces/IVariableContext";

export default interface SubExpression {
  evaluate(context: IVariableContext): string;
}
