import {BaseErrorBody} from './BaseError';

export const JSON_PARSE_ERROR = Symbol();
export type JsonParseError = {
  kind: typeof JSON_PARSE_ERROR;
} & BaseErrorBody;

export const JSON_STRINGIFY_ERROR = Symbol();
export type JsonStringifyError = {
  kind: typeof JSON_STRINGIFY_ERROR;
} & BaseErrorBody;
