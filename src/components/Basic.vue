<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapActions } from "vuex";

import Dynamism from "@/classes/Dynamism";
import ImplicitVariable from "@/interfaces/ImplicitVariable";

const variableContextMixin = require("@/mixins/variableContextMixin.js");
import VariableContext from "@/classes/VariableContext";

@Component
export default class Basic extends VariableContext {
  @Prop() protected component!: any;

  /**
   * TODO Tenere sotto controllo questo funzionamento se da dei problemi con i successivi sviluppi dell'applicazione.
   * There are a few things to know about this passage.
   * The mutation RELOAD_COMPONENT (linked below) current job is to take a component and overwrite its comp data prop.
   * Questo tipo di approccio è potenzialmente pericoloso in quanto duplica di fatto la struttura dati:
   * 1. da una parte abbiamo il componente globale che crea e gestisce tutti gli altri passando di volta
   *    in volta la parte che gli interessa del JSON.
   * 2. Poi quando un dinamismo lancia la mutation RELOAD_COMPONENT, il valore assegnato in quell'istanza
   *    di componente Vue alla proprietà comp può essere diverso rispetto al valore ancora custodito nell'albero dei
   *    componenti contenuto nella proprietà component dell'istanza corrente e globale.
   * 3. Questo può portare ad effetti indesiderati od incompresioni / errori.
   *
   * Il mio suggerimento in merito è quello di procedere con una delle due soluzioni seguenti.
   *
   * 1° soluzione (quella a mio avviso migliore):
   *    1 - la proprietà comp viene rimossa in quanto il suo unico scopo è quello di avere in proxy più immediato
   *        alla properità component
   *    2 - la mutation non cambia il valore del campo comp, ma va ad agire direttamente
   *        sul campo component del main component.
   *        Viene cercato il pezzo di script che deve essere aggiornato per poter aggiornare l'applicazione
   *        e viene riscritto li il nuovo valore.
   *    3 - Vue si accorge del cambiamento ed aggiorna automaticamente la grafica.
   *
   * 2° soluzione:
   * Si mantiene il campo comp, ma lo si traforma in una computed property con un getter ed un setter.
   * Il setter si occuperà, quando invocato, di lanciare un evento Vue che si comporterà come spiegato sotto.
   *
   * This will substitute the data `comp: any = {}` var
   * get comp() {
   *   return this.component ? this.component : {};
   * }
   *
   * set comp() {
   *    // Emit custom event inform the parent component that one of its children
   *    // Must have its source updated
   *    // The parent will handle the event, and eventually broadcast it its parent until
   *    // it reaches the root of the current Main, where the data will be updated and Vue reactivity
   *    // system will update correctly the application.
   *    //
   *    // Another way to implement this, instead of passing an event from various parents
   *    // until it reaches the main component, would be to use a global event bus for the
   *    // current component
   * }
   *
   * A prescindere rimuoverei la dualità esistente tra comp (data property) e component (prop).
   *
   * @namespace comp
   * @see RELOAD_COMPONENT
   * @see reloadComponent
   */
  comp: any = {};

  protected name: string = "";

  private implicitVariables?: ImplicitVariable[]

  protected created(): void {
    if (this.component) {
      this.comp = this.component; // FIXME @see comp
      // saving component in store
      this.$store.dispatch("webup/addComponent", this);
    }
  }

  protected destroyed(): void {
    if (this.component) {
      // remove component from store
      this.$store.dispatch("webup/removeComponent", this);
    }
  }

  public getOptions(): any {
    // TODO questo sara' da rivedere quando gestiremo i setup 'correttamente'
    if (this.component.options && this.component.type) {
      if (this.component.type === "FLD")
        return this.component.options[this.component.type].default;
      else return this.component.options;
    }
    return {};
  }

  public getData(): any {
    if (this.component.data) {
      return this.component.data;
    }
    return {};
  }

  protected hasDynamisms() {
    return (
      this.component != null &&
      this.component.dynamisms &&
      this.component.dynamisms.length > 0
    );
  }

  protected getDynamisms(dynName: string): Dynamism[] {
    if (this.hasDynamisms()) {
      return this.component.dynamisms.filter(
        (d: Dynamism) => dynName === d.event
      );
    }
    return [];
  }
}
</script>
