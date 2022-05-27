import {BaseErrorBody} from './BaseError';

export const NETWORK_ERROR = Symbol();
export type NetworkError = {
  kind: typeof NETWORK_ERROR;
} & BaseErrorBody & NetworkErrorWithStatusCode;

type NetworkErrorWithStatusCode = {
  statusCode?: number;
}
