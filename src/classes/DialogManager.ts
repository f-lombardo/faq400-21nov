import Vue from "vue";
import store from "../store/store";
import Message from "./Message";

export default class DialogManager extends Vue {
  confirm(message: Message, callback: any): void {
    //https://dzone.com/articles/design-patterns-event-bus
    Vue.prototype.$eventBus.subscribe("dialog", callback);
    var main = store.getters["webup/getMain"];
    main.setDialogMessage(message);
  }
}
