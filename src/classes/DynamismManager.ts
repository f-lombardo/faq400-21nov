import { Vue } from 'vue-property-decorator'

import BasicComponent from '@/interfaces/BasicComponent'

import Dynamism from '@/classes/Dynamism'

export default class DynamismManager {
  execute(comp: Vue, dyn: Dynamism): void {
    if (!dyn.source) {
      // TODO lanciare errore?
      return
    }

    // check enable
    if (!dyn.isEnabled()) {
      // TODO messaggio
      return
    }

    // check targets
    if (!dyn.targets || dyn.targets.length == 0) {
      // save variable in source
      this.executeAssignmentsInTarget(dyn.source, dyn)
    } else {
      dyn.targets
        .map((target) => comp.$store.getters['webup/getComponentById'](target))
        .filter((c: any) => c)
        .forEach((c: any) => {
          // save variables in target
          this.executeAssignmentsInTarget(c, dyn)

          // TODO ricalcola la fun

          // TODO ricarica componente
          comp.$store.commit('webup/RELOAD_COMPONENT', c)
        })
    }

    // TODO exec
  }

  executeAssignmentsInTarget(target: BasicComponent, dyn: Dynamism) {
    if (!target.variables) {
      target.variables = {}
    }

    // variables from source component
    if (dyn.source && dyn.source.variables) {
      for (let k in dyn.source.variables) {
        target.variables[k] = dyn.source.variables[k]
      }
    }

    // variables from dyn
    if (dyn.variables) {
      for (let k in dyn.variables) {
        target.variables[k] = dyn.variables[k]
      }
    }

    // TODO variabili esplicite del dinamismo (voglio piangere)

    // TODO (forse) riresettare le variabili implicite

    // change title
    if (dyn.title) {
      target.title = dyn.title
    }
  }
}
