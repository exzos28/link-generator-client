import {BaseErrorBody} from './BaseError';

export const JWT_PARSE_ERROR = Symbol();
export type JwtParseError = {
  kind: typeof JWT_PARSE_ERROR;
} & BaseErrorBody;
