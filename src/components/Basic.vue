<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Basic extends Vue {

  @Prop() protected component!: any;
  protected name: string = '';
  private id: string = this.component.id ? this.component.id : this.component.key;

  protected created(): void {
    if (this.component) {
      // saving component in store
      this.$store.dispatch('addComponent', {
        id: this.id,
        component: this
      });
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch('removeComponent', this.id);
    }
  }
}
</script>