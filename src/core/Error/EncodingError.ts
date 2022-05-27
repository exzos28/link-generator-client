import {BaseErrorBody} from './BaseError';

export const ENCODE_ERROR = Symbol();
export type EncodeError = {
  kind: typeof ENCODE_ERROR;
} & BaseErrorBody;

export const DECODE_ERROR = Symbol();
export type DecodeError = {
  kind: typeof DECODE_ERROR;
} & BaseErrorBody;
