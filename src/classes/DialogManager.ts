import Vue from "vue";
import store from "../store/store";
import Message from "./Message";

export default class DialogManager extends Vue {
  confirm(message: Message, callback: any): void {
    // https://dzone.com/articles/design-patterns-event-bus
    const unsubFunc = Vue.prototype.$eventBus.subscribe("dialog", callback);
    // console.log("DialogManager->unsubFunc", unsubFunc);
    let main = store.getters["webup/getMain"];
    main.setDialogMessage(message, unsubFunc);
  }
}
