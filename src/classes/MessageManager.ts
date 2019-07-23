import Vue from "vue";
import store from "../store/store";

export default class MessageManager extends Vue {
  // TODO gestire tutte le proprietà di message, non solo text
  show(text: string): void {
    var main = store.getters["webup/getMain"];
    main.setMessageVisible(true);
    main.setMessageText(text);
  }
}
