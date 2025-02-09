/* eslint-disable @typescript-eslint/no-explicit-any */
type Listener = (...args: any[]) => void;

export class EventBus {
  listeners: Record<string, Listener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);

    return this;
  }

  off(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      item => item !== callback,
    );

    return this;
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    for (const listener of this.listeners[event]) {
      listener(...args);
    }

    return this;
  }
}
