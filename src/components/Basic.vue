<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import Dynamism from '@/classes/Dynamism'
import ImplicitVariable from '@/interfaces/ImplicitVariable'

import { variableContextMixin } from '@/mixins/variableContextMixin.ts'

@Component({
  mixins: [variableContextMixin],
})
export default class Basic extends Vue {
  @Prop() protected component!: any
  protected name: string = ''

  private implicitVariables?: ImplicitVariable[]

  protected created(): void {
    if (this.component) {
      // saving component in store
      this.$store.dispatch('webup/addComponent', this)
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch('webup/removeComponent', this)
    }
  }

  public getOptions(): any {
    // TODO questo sara' da rivedere quando gestiremo i setup 'correttamente'
    if (this.component.options) {
      return this.component.options[this.component.type].default
    }
    return {}
  }

  public getData(): any {
    if (this.component.data) {
      return this.component.data
    }
    return {}
  }

  protected hasDynamisms() {
    return (
      this.component != null &&
      this.component.dynamisms &&
      this.component.dynamisms.length > 0
    )
  }

  protected getDynamisms(dynName: string): Dynamism[] {
    if (this.hasDynamisms()) {
      return this.component.dynamisms.filter(
        (d: Dynamism) => dynName === d.event
      )
    }

    return []
  }
}
</script>