export default interface IVariableContext {
  variables: {
    [index: string]: string;
  };

  getVariableValue(key: string): string;

  putVariable(key: string, value: string): void;
}
