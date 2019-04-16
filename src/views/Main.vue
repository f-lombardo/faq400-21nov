<template>
  <component :is="mainComponent.type" :component="mainComponent" :key="mainComponent.id"></component>
</template>

<script lang="ts">
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

  private created() {
    // save root in store
    this.$store.commit("webup/SET_ROOT", mainEXD);
  }
}
</script>
