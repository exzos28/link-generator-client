import {Either} from '../fp';
import {JsonString} from '../Json';
import {GlobalError} from '../Error';

export interface JsonKeyValueStore<
    KV extends AbstractJsonKeyValueMap = AbstractJsonKeyValueMap,
    > {
  get<K extends keyof KV>(
      key: K,
  ): Promise<Either<KV[K]['__jsonSerialized__'] | undefined, GlobalError>>;
  set<K extends keyof KV>(
      key: K,
      value: KV[K]['__jsonSerialized__'],
  ): Promise<Either<void, GlobalError>>;
  delete<K extends keyof KV>(key: K): Promise<Either<void, GlobalError>>;
}

export type AbstractJsonKeyValueMap = {[K in string]: JsonString};
