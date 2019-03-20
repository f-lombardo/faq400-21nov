export const dynMixin = {
  methods: {
    manageDyn(dyn) {
      if (!dyn.source) {
        // TODO lanciare errore?
        return
      }

      // TODO check enable

      // check targets
      if (!dyn.targets || dyn.targets.length == 0) {
        // TODO save variable in source
      } else {
        dyn.targets
          .map((target) =>
            this.$store.getters['webup/getComponentById'](target)
          )
          .forEach((comp) => {
            if (!comp) {
              // TODO errore?
              return
            }

            this.$store.commit('webup/RELOAD_COMPONENT', comp)
          })
      }
    },
  },
}
