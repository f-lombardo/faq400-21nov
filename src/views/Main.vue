<template>
  <component :is="root.type" :component="root" :key="root.id"></component>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import { startScript } from "@/mocks/startScript";

@Component
export default class Main extends Vue {
  public root: any = startScript();

  private created() {
    /**
     * TODO
     * Attualmente viene importata una funzione che restituisce ogni volta un oggetto script di scheda nuovo.
     * Questo per evitare l'importazione di un solo oggetto referenziato che può subire diverse modifiche durante l'esecuzione.
     * Quando l'applicazione verrà completata, va inserita nel created la chiamata REST che recupera il JSON dello script di scheda.
     * L'oggetto ritornato sarà quindi nuovo ad ogni creazione del componente Main.
     */
    // save main in store
    this.$store.dispatch("webup/setMain", this);
  }
}
</script>
