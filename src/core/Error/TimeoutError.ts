import {BaseErrorBody} from './BaseError';

export const TIMEOUT_ERROR = Symbol();
export type TimeoutError = {
  kind: typeof TIMEOUT_ERROR;
} & BaseErrorBody;
