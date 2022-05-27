import {Opaque} from 'type-fest';

export const SEMVER = Symbol();
export type Semver = Opaque<string, typeof SEMVER>;
