export const variableContextMixin = {
  data: function() {
    return {
      variables: {},
    }
  },
  methods: {
    get(name) {
      return this.variables[name]
    },
    put(name, value){
      if ('*CLEAR' === value) {
        delete this.variables[name]
      } else {
        this.variables[name] = value
      }
    },
    evaluateExpression(expression) {
      return expression
    }
  }
}
