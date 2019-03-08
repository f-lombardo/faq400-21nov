<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Basic extends Vue {

  protected name: string = '';
  @Prop() protected component!: any;

  protected created(): void {
    if (this.component) {
      // saving component in store
      this.$store.dispatch('addComponent', {
        id: this.component.id,
        component: this
      });
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch('removeComponent', this.component.id);
    }
  }
}
</script>