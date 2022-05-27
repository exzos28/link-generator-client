import {Opaque} from 'type-fest';

export const EMAIL = Symbol();
export type Email = Opaque<string, typeof EMAIL>;
