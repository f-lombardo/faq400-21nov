import Vue from "vue";
import store from "../store/store";
import Message from "./Message";

export default class MessageManager extends Vue {
  show(message: Message): void {
    const main = store.getters["webup/getMain"];
    main.setMessage(message);
  }
}
