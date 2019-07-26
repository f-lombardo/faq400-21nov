import Vue from "vue";
import ScriptManager from "./classes/services/ScriptService";

declare module "vue/types/vue" {
  interface Vue {
    $scriptManager: ScriptManager;
  }
}
