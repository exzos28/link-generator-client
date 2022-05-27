import type {Opaque} from 'type-fest';

const MILLISECOND = Symbol('Millisecond');
export type Millisecond = Opaque<number, typeof MILLISECOND>;
