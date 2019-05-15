import Vue from 'vue'
import Component from 'vue-class-component'
import { ComponentStoredState } from '../store/modules/StateRestorer'

@Component
export default class StateRestorer extends Vue {
  // Life cycle hooks
  mounted() {

  }

  beforeDestroy() {
    // TODO Set controls and check if name is correct
    this.$store.commit('StateRestorer/STORE_COMPONENT_STATE', {
      // Fix this
      key: this.comp!.key || '',

    })
  }

  // Methods
  SRComposeStateToStore(): ComponentStoredState {
    let data: {[index: string]: any} = {};
    // TODO -> Check: this may require a clone deep to avoid (possible?) memory leaks ?
    Object.keys(this.$data).forEach(key => data[key] = this.$data[key])
    return {
      data,
      scrollX: this.$el.scrollLeft,
      scrollY: this.$el.scrollTop
    }
  }

  SRSetStateFromStorage() {

  }
}