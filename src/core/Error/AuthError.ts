import {BaseErrorBody} from './BaseError';

export const NOT_AUTHORIZED_ERROR = Symbol();
export type NotAuthorizedError = {
  kind: typeof NOT_AUTHORIZED_ERROR;
} & BaseErrorBody;
