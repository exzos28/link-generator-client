import {Disposer} from '../Service';

export interface Bus<L extends BaseListener> extends BusSource<L>, BusSink<L> {}

export interface BusSource<L extends BaseListener> {
  readonly isBeingListened: boolean;
  listen(listener: L): Disposer;
  once(listener: L): Disposer;
  forget(listener: L): void;
}

export interface BusSink<L extends BaseListener> {
  send(...args: Parameters<L>): void;
}

export type BaseListener = (...args: any[]) => void;
