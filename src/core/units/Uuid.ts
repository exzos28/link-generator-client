import {Opaque} from 'type-fest';

export const UUID = Symbol();
export type Uuid = Opaque<string, typeof UUID>;
