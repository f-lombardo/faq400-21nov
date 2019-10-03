import VariableContext from "./VariableContext";
import Basic from "@/components/Basic.vue";
import SmeupVariables from "@/interfaces/SmeupVariables";

interface Variable {
  key: string;
  value: string;
}

interface VariableMap {
  [index: string]: string;
}

export default class Dynamism {
  event: string;
  source?: string;
  implicitVariables: VariableMap = {};
  variables: SmeupVariables = {};
  targets: string[] = [];
  title?: string;
  exec: string = "";

  constructor(event: string) {
    this.event = event;
  }

  addImplictVariable(variable: Variable) {
    this.implicitVariables[variable.key] = variable.value;
  }

  isEnabled() {
    // TODO
    return true;
  }
}
