// noinspection ES6PreferShortImport
import {JsonSerializable} from '../Json/JsonSubject';
import {BaseErrorBody} from './BaseError';

export const GENERAL_REST_CLIENT_ERROR = Symbol();
export type GeneralRestClientError = {
  kind: typeof GENERAL_REST_CLIENT_ERROR;
  statusCode: number;
  body?: JsonSerializable;
} & BaseErrorBody;
