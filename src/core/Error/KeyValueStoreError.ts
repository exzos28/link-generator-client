import {BaseErrorBody} from './BaseError';

export const KEY_VALUE_STORE_GET_ERROR = Symbol();
export type KeyValueStoreGetError = {
  kind: typeof KEY_VALUE_STORE_GET_ERROR;
} & BaseErrorBody;

export const KEY_VALUE_STORE_SET_ERROR = Symbol();
export type KeyValueStoreSetError = {
  kind: typeof KEY_VALUE_STORE_SET_ERROR;
} & BaseErrorBody;

export const KEY_VALUE_STORE_DELETE_ERROR = Symbol();
export type KeyValueStoreDeleteError = {
  kind: typeof KEY_VALUE_STORE_DELETE_ERROR;
} & BaseErrorBody;
