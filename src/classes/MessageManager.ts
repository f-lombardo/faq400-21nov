import Vue from "vue";
import store from "../store/store";

export default class MessageManager extends Vue {
  show(msg: any): void {
    //TODO dall'istanza Vue si recupera il componente Main.vue per renderlo visibile
    //List Registered Vue Components
    //Vue.options.components
    //alert(msg.messages[0].text);
    //var main = Vue.prototype.$store
    var main = store.getters["webup/getMain"];
    main.setMessageVisible(true);
    main.setMessageText(msg.messages[0].text);
    //return Object.keys(components);
  }
}
