import type {ValueOf} from 'type-fest';

import {BusImpl} from '../Bus';
import {Disposer} from '../Service';
import {Router, RouterMap, RouterMapEvents, RouterSource} from './Router';

export default class RouterImpl<M extends RouterMap> implements Router<M> {
    private readonly _domain = new BusImpl<
        (event: RouterMapEvents<M>) => void
    >();

    private readonly _listeners = new Map<keyof M, Set<ValueOf<M>>>();

    send<K extends keyof M>(theme: K, ...args: Parameters<M[K]>) {
        if (this._domain.isBeingListened) {
            this._domain.send({theme, args});
        }
        const listeners = this._listeners.get(theme);
        if (listeners) {
            for (const listener of listeners) {
                listener(...args);
            }
        }
    }

    listen<K extends keyof M>(theme: K, listener: M[K]) {
        let listeners = this._listeners.get(theme);
        if (!listeners) {
            listeners = new Set();
            this._listeners.set(theme, listeners);
        }
        listeners.add(listener);
        return (() => {
            this.forget(theme, listener);
        }) as Disposer;
    }

    once<K extends keyof M>(theme: K, listener: M[K]) {
        const _listener = ((...args: Parameters<M[K]>) => {
            listener(...args);
            this.forget(theme, _listener);
        }) as M[K];
        return this.listen(theme, _listener);
    }

    forget<K extends keyof M>(theme: K, listener: M[K]) {
        const listeners = this._listeners.get(theme);
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0) {
                this._listeners.delete(theme);
            }
        }
    }

    get domain(): RouterSource<M>['domain'] {
        return this._domain;
    }
}
