export default class EventBus {
  private subscriptions: Array<any> = [];

  public subscribe(eventType: any, callback: any): any {
    const id = Symbol("id"); //unique id
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {};
    this.subscriptions[eventType][id] = callback;
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
    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key =>
      this.subscriptions[eventType][key](arg)
    );
  }
}
