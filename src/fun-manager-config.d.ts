import Vue from "vue";
import FunManager from "./classes/FunManager";

declare module "vue/types/vue" {
  interface Vue {
    $funManager: FunManager;
  }
}
