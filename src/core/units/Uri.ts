import {Opaque} from 'type-fest';

// https://webmasters.stackexchange.com/a/77783

export const URL_SYMBOL = Symbol();
export type Url = Opaque<string, typeof URL_SYMBOL>;

export const URN = Symbol();
export type Urn = Opaque<string, typeof URN>;

export const URC = Symbol();
export type Urc = Opaque<string, typeof URC>;

export const DATA_URI = Symbol();
export type DataUri = Opaque<string, typeof DATA_URI>;

export type Uri = Url | Urn | Urc | DataUri;
