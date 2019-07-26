<template>
  <div>
    <component :is="root.type" :component="root" :key="root.id"></component>
    <!--   -->
    <smeup-message
      :visible="this.message.visible"
      :text="this.message.text"
      @onShowFalse="
        setMessage({
          visible: false
        })
      "
    ></smeup-message>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import { startScript } from "@/mocks/startScript";

import smeupMessage from "@/components/Message.vue";

import Message from "../interfaces/Message";

@Component({
  components: {
    smeupMessage
  }
})
export default class Main extends Vue {
  public root: any = startScript();
  public message: Message = {
    text: "",
    visible: false
  };

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

  public setMessage(message: Message): void {
    this.message = message;
  }
}
</script>
