import BasicComponent from '@/interfaces/BasicComponent'

interface Variable {
  key: string
  value: string
}

interface VariableMap {
  [index: string]: string
}

export default class Dynamism {
  event: string
  source?: BasicComponent
  variables: VariableMap = {}
  targets: string[] = []
  title?: string

  constructor(event: string) {
    this.event = event
  }

  addImplictVariable(variable: Variable) {
    this.variables[variable.key] = variable.value
  }

  isEnabled() {
    // TODO
    return true
  }
}
