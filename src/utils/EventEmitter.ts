export class EventEmitter {
  events: { [key: string]: Array<() => void> };

  constructor() {
    this.events = {};
  }

  /** 登録 */
  on(event: string, callback: () => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  remove(event: string, listener: () => void): void {
    if (this.events[event]) {
      const index = this.events[event].indexOf(listener);
      if (~index) {
        this.events[event].splice(index, 1);
      }
    }
  }

  emit(event: string): void {
    const events = this.events[event];
    if (events) {
      events.forEach((callback) => callback());
    }
  }
}
