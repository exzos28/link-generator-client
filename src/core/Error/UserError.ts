import {BaseErrorBody} from './BaseError';

export const USER_CANCELLATION_ERROR = Symbol();
export type UserCancellationError = {
  kind: typeof USER_CANCELLATION_ERROR;
} & BaseErrorBody;
