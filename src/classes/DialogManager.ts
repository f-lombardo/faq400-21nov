import Vue from "vue";
import store from "../store/store";
import Message from "./Message";
import Fun from "./Fun";

export default class DialogManager extends Vue {
  confirm(message: Message, fun: Fun): void {
    // https://dzone.com/articles/design-patterns-event-bus
    const unsubFunc = Vue.prototype.$eventBus.subscribe("dialog", fun);
    fun.clearUISetup();
    // console.log("DialogManager->unsubFunc", unsubFunc);
    let main = store.getters["webup/getMain"];
    main.setDialogMessage(message, unsubFunc);
  }
}
