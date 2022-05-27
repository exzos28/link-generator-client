import {Opaque} from 'type-fest';

export const BUNDLE_ID = Symbol();
export type BundleId = Opaque<string, typeof BUNDLE_ID>;
