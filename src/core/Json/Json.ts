import {Either} from '../fp';
import {JsonSerializable, JsonString} from './JsonSubject';
import {GlobalError} from '../Error';

export interface Json {
  parse<T extends JsonSerializable = JsonSerializable>(
    source: JsonString<T>,
  ): Either<T, GlobalError>;
  stringify<T extends JsonSerializable = JsonSerializable>(
    source: T,
    space?: string | number,
  ): Either<JsonString<T>, GlobalError>;
}
