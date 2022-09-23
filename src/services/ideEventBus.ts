export type IdeEventBusCallback<T> = (event: T) => unknown;

export class IdeEventBus<T> {
  callbackList: IdeEventBusCallback<T>[] = [];

  addCallback(callback: IdeEventBusCallback<T>): void {
    this.callbackList.push(callback);
  }

  removeCallback(targetCallback: IdeEventBusCallback<T>): void {
    this.callbackList = this.callbackList.filter(callback => callback !== targetCallback);
  }

  emit(event: T): void {
    this.callbackList.forEach(function(cb) {
      cb(event);
    });
  }
}
