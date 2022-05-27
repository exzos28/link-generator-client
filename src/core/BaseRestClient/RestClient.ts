import {JsonSerializable} from '../Json';
import {GeneralRestClientError, GlobalError} from '../Error';

export interface RestClient {
  generalizeError(e: SpecializedRestClientError): GeneralRestClientError;
  generalizeError(e: GlobalError | SpecializedRestClientError): GlobalError;
}

export type RestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export const SPECIALIZED_REST_CLIENT_ERROR = Symbol();
export type SpecializedRestClientError<
  E extends JsonSerializable = JsonSerializable,
> = {
  kind: typeof SPECIALIZED_REST_CLIENT_ERROR;
  description: string;
  raw: unknown;
  body?: E;
  statusCode: number;
};

export type RestClientCallError<E extends JsonSerializable = JsonSerializable> =
  GlobalError | SpecializedRestClientError<E>;
