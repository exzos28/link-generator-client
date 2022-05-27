import {BaseErrorOptions, ErrorRepository} from './ErrorRepository';
import {
  CANCELLATION_ERROR,
  JWT_PARSE_ERROR,
  KEY_VALUE_STORE_DELETE_ERROR,
  KEY_VALUE_STORE_GET_ERROR,
  KEY_VALUE_STORE_SET_ERROR,
  NETWORK_ERROR,
  NOT_AUTHORIZED_ERROR,
  UNKNOWN_ERROR,
  UnknownError,
  USER_CANCELLATION_ERROR,
  GENERAL_REST_CLIENT_ERROR,
  BaseError,
  TIMEOUT_ERROR,
  JSON_PARSE_ERROR,
} from '../Error';

export default class ErrorRepositoryImpl implements ErrorRepository {
  private static readonly _KIND_DESCRIPTION_DICTIONARY = {
    [NOT_AUTHORIZED_ERROR]: 'Not authorized to perform an action',
    [CANCELLATION_ERROR]: 'The async task has been cancelled programmatically',
    [JSON_PARSE_ERROR]: 'Cannot parse JSON from a string',
    [JWT_PARSE_ERROR]: 'Cannot parse JWT from a string',
    [KEY_VALUE_STORE_GET_ERROR]: 'Cannot get a value from the key-value store',
    [KEY_VALUE_STORE_SET_ERROR]: 'Cannot set a value of the key-value store',
    [KEY_VALUE_STORE_DELETE_ERROR]:
      'Cannot delete a value from the key-value store',
    [NETWORK_ERROR]: 'The network is unreachable',
    [GENERAL_REST_CLIENT_ERROR]: 'The REST client has received an error',
    [UNKNOWN_ERROR]: 'Unknown error occurred',
    [USER_CANCELLATION_ERROR]: 'The async task has been cancelled by the user',
    [TIMEOUT_ERROR]: 'Timeout has been reached',
  } as const;

  private static _createMap() {
    const dict = ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY;
    const keys = Reflect.ownKeys(dict);
    return new Map<symbol | string, string>(
      keys.map(key => [key, dict[key as keyof typeof dict]]),
    );
  }

  private static readonly _KIND_DESCRIPTION_MAP =
    ErrorRepositoryImpl._createMap();

  create<E extends BaseError>(error?: BaseErrorOptions<E>): E | UnknownError {
    if (!error) {
      const description =
        ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY[UNKNOWN_ERROR];
      return {
        kind: UNKNOWN_ERROR,
        description,
        raw: new Error(description),
      };
    }
    const description =
      error.description ??
      ErrorRepositoryImpl._KIND_DESCRIPTION_MAP.get(error.kind) ??
      ErrorRepositoryImpl._KIND_DESCRIPTION_DICTIONARY[UNKNOWN_ERROR];
    const raw = error.raw ?? new Error(description);
    return {
      description,
      raw,
      ...error,
    } as E;
  }
}
