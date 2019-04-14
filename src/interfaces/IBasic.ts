import IVariableContext from "./IVariableContext";

export default interface IBasic extends IVariableContext {
  component: {
    title?: string;
  };
}
