<template>
  <component :is="mainComponent.type" :component="mainComponent"></component>
</template>

<script lang="ts">
<<<<<<< HEAD
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import { mainEXD } from "@/mocks/script";

@Component({
  computed: {
    ...mapGetters({
      mainComponent: "webup/mainComponent"
    })
  }
})
export default class Main extends Vue {
  mainComponent: any;
=======
import { Component, Vue } from 'vue-property-decorator'
import { mainEXD } from '@/mocks/script'

@Component
export default class Main extends Vue {

  get mainComponent() {
    return this.$store.getters['webup/getMainComponent']
    // return this.$store.state.webup.root
  } 
>>>>>>> dynamism-exec

  private created() {
    // save root in store
    this.$store.commit("webup/SET_ROOT", mainEXD);
  }
}
</script>
