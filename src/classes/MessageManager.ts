import Vue from "vue";
import store from "../store/store";

export default class MessageManager extends Vue {
  show(msg: any): void {
    //alert(msg.messages[0].text);
    var main = store.getters["webup/getMain"];
    main.setMessageVisible(true);
    main.setMessageText(msg.messages[0].text);
  }
}
