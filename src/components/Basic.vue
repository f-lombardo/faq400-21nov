<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Dynamism from './interfaces/Dynamism'
import ImplicitVariables from './interfaces/ImplicitVariable'

@Component
export default class Basic extends Vue {
  @Prop() protected component!: any
  protected name: string = ''
  private id: string = this.component.id
    ? this.component.id
    : this.component.key

  private implicitVariables?: ImplicitVariables[]

  protected created(): void {
    if (this.component) {
      // saving component in store
      this.$store.dispatch('addComponent', {
        id: this.id,
        component: this,
      })
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch('removeComponent', this.id)
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

    // return empty array
    return []
  }

  get isLoaded() {
    if (this.component) {
      return this.component.loaded
    }

    return false
  }

  set isLoaded(value) {
    if (this.component) {
      console.log('setting loaded')
      this.component.loaded = value
    }
  }
}
</script>