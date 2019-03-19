<template>
  <component :is="mainComponent.type" :component="mainComponent"></component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import script from '@/script.js'

@Component({
  computed: {
    ...mapGetters({
      mainComponent: 'webup/mainComponent',
    }),
  },
})
export default class Main extends Vue {
  private script: any

  mainComponent: any

  private created() {
    this.script = script

    // save root in store
    this.$store.commit('webup/SET_ROOT', this.script)
  }
}
</script>