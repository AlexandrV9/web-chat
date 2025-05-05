import { EventBus } from '../EventBus';
import { PlainObject } from '@/types';

type State = PlainObject;

export const STORE_EVENTS = {
  updated: 'updated',
} as const;

export class Store extends EventBus {
  public state: State = {};

  constructor(initialState?: State) {
    super();
    this.state = initialState ?? {};
  }

  public getState() {
    return this.state;
  }

  public setState(updater: ((prevState: State) => State) | State) {
    if (!updater) return;

    const nextState = typeof updater === 'function' ? updater(this.state) : updater;

    Object.assign(this.state, nextState);

    this.emit(STORE_EVENTS.updated);
  }
}

export const store = new Store();
