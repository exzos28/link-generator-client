import {UnknownError, BaseError, BaseErrorBody} from '../Error';

export interface ErrorRepository {
  create(): UnknownError;
  create<Error extends BaseError>(error: BaseErrorOptions<Error>): Error;
}

export type BaseErrorOptions<Error extends BaseError> = Omit<
  Error,
  keyof BaseErrorBody
> &
  Partial<Pick<Error, keyof BaseErrorBody>>;
