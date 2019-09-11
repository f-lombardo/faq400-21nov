/* eslint-disable linebreak-style */
export default class EventBus {
  private subscriptions: Array<any> = [];

  //  this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
  public subscribe(eventType: any, callback: any): void {
    const id = Symbol("id"); //unique id
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {};
    this.subscriptions[eventType][id] = callback;
    //return id;
    /*
    return {
      unsubscribe: function unsubscribe() {
        delete this.subscriptions[eventType][id];
        if (
          Object.getOwnPropertySymbols(this.subscriptions[eventType]).length ===
          0
        ) {
          delete this.subscriptions[eventType];
        }
      }
    };
    */
  }

  //this.publish = function publishEventWithArgs(eventType, arg) {
  public publish(eventType: any, arg: any): void {
    if (!this.subscriptions[eventType]) return;
    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key =>
      this.subscriptions[eventType][key](arg)
    );
  }
}
