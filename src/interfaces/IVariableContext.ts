export default interface IVariableContext {
  getAllVariables(): {
    name: string;
    value: string;
  }[];

  getVariableValue(key: string): string;

  putVariable(key: string, value: string): void;

  getParentVariableContext(): IVariableContext | null;

  findValue(name: string): string;

  getVariableContextAnchestors(): IVariableContext[];

  findFirstContainingType(ct: ContextType): IVariableContext | null;

  findLastContainingType(ct: ContextType): IVariableContext | null;
}

export enum ContextType {
  SEC,
  SCH,
  LOO
}
