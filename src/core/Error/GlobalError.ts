import {NotAuthorizedError} from './AuthError';
import {CancellationError} from './CancellablePromiseError';
import {JwtParseError} from './JwtError';
import {
  KeyValueStoreDeleteError,
  KeyValueStoreGetError,
  KeyValueStoreSetError,
} from './KeyValueStoreError';
import {UnknownError} from './UnknownError';
import {UserCancellationError} from './UserError';
import {NetworkError} from './NetworkError';
import {GeneralRestClientError} from './RestClientError';
import {DecodeError, EncodeError} from './EncodingError';
import {TimeoutError} from './TimeoutError';
import {JsonParseError, JsonStringifyError} from './JsonError';

export type GlobalError =
  | NotAuthorizedError
  | CancellationError
  | EncodeError
  | DecodeError
  | JwtParseError
  | JsonParseError
  | JsonStringifyError
  | KeyValueStoreDeleteError
  | KeyValueStoreGetError
  | KeyValueStoreSetError
  | NetworkError
  | GeneralRestClientError
  | UnknownError
  | TimeoutError
  | UserCancellationError;
