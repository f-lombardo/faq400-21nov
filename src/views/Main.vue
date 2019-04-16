<template>
  <component :is="mainComponent.type" :component="mainComponent" :key="mainComponent.id"></component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mainEXD } from '@/mocks/script'

@Component
export default class Main extends Vue {

  get mainComponent() {
    return this.$store.getters['webup/getMainComponent']
    //return this.$store.state.webup.root
  } 

  private created() {
    // save root in store
    this.$store.commit('webup/SET_ROOT', mainEXD)
  }
}
</script>