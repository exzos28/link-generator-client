import {Either} from '../fp';
import {GlobalError} from '../Error';

export interface KeyValueStore<
  KV extends AbstractKeyValueMap = AbstractKeyValueMap,
> {
  get<K extends keyof KV>(
      key: K,
  ): Promise<Either<KV[K] | undefined, GlobalError>>;
  set<K extends keyof KV>(
      key: K,
      value: KV[K],
  ): Promise<Either<void, GlobalError>>;
  delete<K extends keyof KV>(key: K): Promise<Either<void, GlobalError>>;
}

export type AbstractKeyValueMap = {[K in string]: string};
