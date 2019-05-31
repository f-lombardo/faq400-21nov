import Vue from "vue";
import Component from "vue-class-component";
import { ComponentStoredState } from "../store/modules/StateRestorer";

@Component
export default class StateRestorer extends Vue {
  // This field gets overrided by declarations in BasicComponent.
  // It's just for avoiding TS errors on comp.id
  comp: { [index: string]: any } = {};

  // Life cycle hooks
  mounted() {
    this.SRSetStateFromStorage();
  }

  beforeDestroy() {
    // TODO Set controls and check if name is correct
    this.$store.commit("StateRestorer/STORE_COMPONENT_STATE", {
      // Fix this
      id: this.comp.id || "",
      toStore: this.SRComposeStateToStore()
    });
  }

  // Methods
  SRComposeStateToStore(): ComponentStoredState {
    let data: { [index: string]: any } = {};
    // TODO -> Check: this may require a clone deep to avoid (possible?) memory leaks ?
    Object.keys(this.$data).forEach(key => (data[key] = this.$data[key]));
    return {
      data,
      scrollX: this.$el.scrollLeft,
      scrollY: this.$el.scrollTop
    };
  }

  SRSetStateFromStorage() {
    let stateToSet = this.$store.getters["StateRestorer/getComponentState"](
      this.comp.id
    );
    // Sets positions
    this.$el.scrollLeft = stateToSet.scrollX;
    this.$el.scrollTop = stateToSet.scrollY;
    // Sets stored values
    Object.keys(stateToSet.data).forEach(key => {
      this.$data[key] = stateToSet.data[key];
    });
  }
}
