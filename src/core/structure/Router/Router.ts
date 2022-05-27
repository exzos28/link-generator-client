import {Disposer} from '../Service';
import {BaseListener, BusSource} from '../Bus';

export interface Router<M extends RouterMap>
  extends RouterSource<M>,
    RouterSink<M> {}

export type RouterMap = {
  [K in string | number | symbol]: BaseListener;
};

export type RouterMapEvents<M extends RouterMap> = {
  [K in keyof M]: {
    theme: K;
    args: Parameters<M[K]>;
  };
}[keyof M];

export interface RouterSource<M extends RouterMap> {
  listen<K extends keyof M>(theme: K, listener: M[K]): Disposer;
  once<K extends keyof M>(theme: K, listener: M[K]): Disposer;
  forget<K extends keyof M>(theme: K, listener: M[K]): void;
  readonly domain: BusSource<(event: RouterMapEvents<M>) => void>;
}

export interface RouterSink<M extends RouterMap> {
  send<K extends keyof M>(theme: K, ...args: Parameters<M[K]>): void;
}
