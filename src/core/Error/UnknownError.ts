import {BaseErrorBody} from './BaseError';

export const UNKNOWN_ERROR = Symbol.for('UNKNOWN_GLOBAL_ERROR');
export type UnknownError = {
  kind: typeof UNKNOWN_ERROR;
} & BaseErrorBody;
