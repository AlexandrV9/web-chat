import { setValueInObjectByPath } from '@/shared/utils';
import { EventBus } from '../EventBus';

type Indexed = Record<string, unknown>;

export const STORE_EVENTS = {
  updated: 'updated',
} as const;

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    setValueInObjectByPath(this.state, path, value);

    this.emit(STORE_EVENTS.updated);
  }
}

export const store = new Store();
