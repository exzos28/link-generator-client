import {PromiseState} from './PromiseState';
import {Either} from '../fp';

export interface PromiseStateProvider<R, E> {
  readonly state: PromiseState<R, E | PromiseCancellationError> | undefined;
  fetch(): Promise<Either<R, E | PromiseCancellationError>>;
  cancel(): void;
}

export const PROMISE_CANCELLATION_ERROR = Symbol();

export type PromiseCancellationError = {
  kind: typeof PROMISE_CANCELLATION_ERROR;
};
