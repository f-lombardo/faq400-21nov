import SubExpression from './SubExpression'
import Constant from './Constant'
import Variable from './Variable'

import IVariableContext from '@/interfaces/IVariableContext'

export default class ExpressionEvaluator {
  variableExpression(context: IVariableContext, expression: string): string {
    if (!expression) {
      return ''
    }

    let sqrBrkCount = 0
    let constString = ''
    let varString = ''

    const expressions: SubExpression[] = []

    for (let i = 0; i < expression.length; i++) {
      const c = expression.charAt(i)

      if (c === '[') {
        if (sqrBrkCount === 0 && constString.length > 0) {
          expressions.push(this.addSubExpression(constString))
          constString = ''
        }
        sqrBrkCount++
        varString += c
      } else if (c === ']') {
        sqrBrkCount--
        varString += c
        if (sqrBrkCount === 0) {
          expressions.push(this.addSubExpression(varString))
          varString = ''
        }
      } else if (sqrBrkCount === 0) {
        constString += c
      } else {
        varString += c
      }
    }

    if (sqrBrkCount !== 0) {
      throw `[ ]  unbalanced near ${expression} `
    }

    if (constString.length > 0) {
      expressions.push(this.addSubExpression(constString))
    }

    return expressions.map((exp) => exp.evaluate(context)).join('')
  }

  private addSubExpression(expression: string): SubExpression {
    const first = expression.indexOf('[')
    const last = expression.lastIndexOf(']')

    if (first === -1 && last === -1) {
      return new Constant(expression)
    } else if (first === 0 && last === expression.length - 1) {
      return new Variable(expression.substring(1, last))
    } else if (first === last - 1) {
      throw `Empty [] in ${expression}`
    } else {
      throw `[ ]  unbalanced near ${expression} `
    }
  }
}
