import Fun from "@/classes/Fun";
import store from "../../store/store";
import { Vue } from "vue-property-decorator";

export default class EventBus {
  private subscriptions: Array<any> = [];

  private funSmeup: Fun = new Fun("F(;;)");

  public subscribe(eventType: any, fun: Fun): any {
    this.funSmeup = fun;
    const id = Symbol("id"); //unique id
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {};
    this.subscriptions[eventType][id] = fun;
    //console.log("EventBus -> subscriptions", this.subscriptions);
    return {
      unsubscribe: function unsubscribe() {
        //console.log("EventBus -> unsubscribing:", eventType, id);
        delete this.subscriptions[eventType][id];
        if (
          Object.getOwnPropertySymbols(this.subscriptions[eventType]).length ===
          0
        ) {
          delete this.subscriptions[eventType];
        }
      }
    };
  }

  public publish(eventType: any, arg: any): void {
    if (!this.subscriptions[eventType]) return;

    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key => {
      var fun = this.subscriptions[eventType][key];
      console.log("fun", fun);
      Vue.prototype.$funManager.execute(fun).then(() => {
        if (this.funSmeup.getNotify()) {
          var notify = this.funSmeup.getNotify();
          if (notify) {
            notify.forEach(function(element) {
              console.log("Notify element " + element);
              const notifyVueComponent = store.getters[
                "webup/getComponentById"
              ](element);
              if (notifyVueComponent && notifyVueComponent.hasFun()) {
                notifyVueComponent.$emit("onExecFun");
              }
            });
          }
        }
      });
    });
  }
}
