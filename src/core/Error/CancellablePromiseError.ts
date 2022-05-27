import {BaseErrorBody} from './BaseError';

export const CANCELLATION_ERROR = Symbol();
export type CancellationError = {
  kind: typeof CANCELLATION_ERROR;
} & BaseErrorBody;
