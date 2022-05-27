import {Either} from '../fp';
import {CancellationError} from '../Error';

export type CancellablePromiseEither<R, E> = Promise<
  Either<R, E | CancellationError>
> &
  CancellablePromiseMixin;

export type CancellablePromiseMixin = {
  cancel(): void;
};
