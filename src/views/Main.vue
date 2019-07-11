<template>
  <component
    :is="mainComponent.type"
    :component="mainComponent"
    :key="mainComponent.id"
  ></component>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import { startScript } from "@/mocks/startScript";

@Component({
  computed: {
    ...mapGetters({
      mainComponent: "webup/getRoot"
    })
  }
})
export default class Main extends Vue {
  mainComponent: any;

  private created() {
    /**
     * TODO
     * Attualmente viene importata una funzione che restituisce ogni volta un oggetto script di scheda nuovo.
     * Questo per evitare l'importazione di un solo oggetto referenziato che può subire diverse modifiche durante l'esecuzione.
     * Quando l'applicazione verrà completata, va inserita nel created la chiamata REST che recupera il JSON dello script di scheda.
     * L'oggetto ritornato sarà quindi nuovo ad ogni creazione del componente Main.
     */
    // save root in store
    this.$store.dispatch("webup/setRoot", startScript());
  }
}
</script>
