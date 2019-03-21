export const variableContextMixin = {
  data: function() {
    return {
      variables: {},
    }
  },

  methods: {
    add(name: string, value: string) {
      this.variables[name] = value
    },
  },
}
