import type {Opaque} from 'type-fest';

export type Disposer = Opaque<() => void, typeof DISPOSER>;
export const DISPOSER = Symbol();
