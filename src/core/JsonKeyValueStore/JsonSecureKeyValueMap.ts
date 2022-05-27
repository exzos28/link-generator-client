import {JsonString} from '../Json';
import {KeyValueMap} from '../KeyValueStore';

export type JsonSecureKeyValueMap = {
  [K in keyof KeyValueMap]: KeyValueMap[K] extends JsonString
    ? KeyValueMap[K]
    : never;
};
