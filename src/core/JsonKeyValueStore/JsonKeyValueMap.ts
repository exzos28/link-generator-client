import {KeyValueMap} from '../KeyValueStore';
import {JsonString} from '../Json';

export type JsonKeyValueMap = {
  [K in keyof KeyValueMap]: KeyValueMap[K] extends JsonString
    ? KeyValueMap[K]
    : never;
};
