<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import Dynamism from './interfaces/Dynamism'
import ImplicitVariables from './interfaces/ImplicitVariable'

import { dynMixin } from '@/mixins/dynMixin'

@Component({
  mixins: [dynMixin],
})
export default class Basic extends Vue {
  @Prop() protected component!: any
  protected name: string = ''

  private implicitVariables?: ImplicitVariables[]

  protected created(): void {
    if (this.component) {
      // saving component in store
      this.$store.dispatch('webup/addComponent', this.component)
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch('webup/removeComponent', this.component)
    }
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