import IVariableContext from "./IVariableContext";

export default interface IBasic extends IVariableContext {
  id: string;
  component: {
    title?: string;
  };
}
