export const variableContextMixin = {
  data: function() {
    return {
      variables: {},
    }
  },

  methods: {
    get(name: string): string {
      return this.variables[name]
    },

    put(name: string, value: string): void {
      if ('*CLEAR' === value) {
        delete this.variables[name]
      } else {
        this.variables[name] = value
      }
    },

    evaluateExpression(expression: string): string {
      return expression
    },
  },
}
