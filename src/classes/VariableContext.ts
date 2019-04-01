import { Vue } from 'vue-property-decorator'
import IVariableContext from '@/interfaces/IVariableContext'

export default class VariableContext extends Vue implements IVariableContext {
  variables: {
    [index: string]: string
  }

  constructor() {
    super()
    this.variables = {}
  }

  getVariableValue(key: string): string {
    return this.variables[key]
  }

  putVariable(key: string, value: string): void {
    this.variables[key] = value
  }
}
