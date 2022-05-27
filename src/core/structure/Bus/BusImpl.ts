import {BaseListener, Bus} from './Bus';
import {Disposer} from '../Service';

export default class BusImpl<L extends BaseListener> implements Bus<L> {
  private readonly _listeners = new Set<L>();

  get isBeingListened() {
    return this._listeners.size > 0;
  }

  send(...args: Parameters<L>) {
    for (const listener of this._listeners) {
      listener(...args);
    }
  }

  listen(listener: L) {
    this._listeners.add(listener);
    return (() => {
      this.forget(listener);
    }) as Disposer;
  }

  once(listener: L) {
    const _listener = ((...args: Parameters<L>) => {
      listener(...args);
      this.forget(_listener);
    }) as L;
    return this.listen(_listener);
  }

  forget(listener: L) {
    this._listeners.delete(listener);
  }
}
