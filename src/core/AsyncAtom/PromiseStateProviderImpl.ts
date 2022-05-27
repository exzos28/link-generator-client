import {makeObservable, observable, runInAction, when} from 'mobx';
import {
  PROMISE_CANCELLATION_ERROR,
  PromiseCancellationError,
  PromiseStateProvider,
} from './PromiseStateProvider';
import {FULFILLED, PENDING, PromiseState, REJECTED} from './PromiseState';
import {Either, error} from '../fp';

export default class PromiseStateProviderImpl<R, E>
  implements PromiseStateProvider<R, E>
{
  private static readonly PENDING_STATE = {status: PENDING} as const;

  private static readonly CANCELLATION_ERROR = {
    kind: PROMISE_CANCELLATION_ERROR,
  } as const;

  private static readonly CANCELLED_STATE = {
    status: REJECTED,
    error: PromiseStateProviderImpl.CANCELLATION_ERROR,
  } as const;

  @observable.ref private _state?: PromiseState<
    R,
    E | PromiseCancellationError
  >;

  constructor(private readonly _fetch: FetchState<R, E>) {
    makeObservable(this);
  }

  get state() {
    return this._state;
  }

  private _setState(state: PromiseStateProvider<R, E>['state']) {
    runInAction(() => {
      this._state = state;
    });
  }

  async fetch(): Promise<Either<R, PromiseCancellationError | E>> {
    this._setState(PromiseStateProviderImpl.PENDING_STATE);
    const fetch_ = await Promise.race([
      this._fetch(),
      when(() => this._state === PromiseStateProviderImpl.CANCELLED_STATE),
    ]);
    if (fetch_ === undefined) {
      return error(PromiseStateProviderImpl.CANCELLATION_ERROR);
    }
    if (fetch_.success) {
      this._setState({status: FULFILLED, result: fetch_.right});
    } else {
      this._setState({status: REJECTED, error: fetch_.left});
    }
    return fetch_;
  }

  cancel() {
    this._setState(PromiseStateProviderImpl.CANCELLED_STATE);
  }
}

/**
 * @throws {never}
 */
export type FetchState<R, E> = () => Promise<Either<R, E>>;
