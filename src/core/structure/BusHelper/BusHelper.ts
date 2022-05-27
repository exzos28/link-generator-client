import {CancellablePromiseEither} from '../../CancellablePromise';
import {BaseListener} from '../Bus';
import {GlobalError} from '../../Error';

export interface BusHelper<L extends BaseListener> {
  when(
    condition?: (...args: Parameters<L>) => boolean,
  ): CancellablePromiseEither<Parameters<L>, GlobalError>;
}
