import {Json} from './Json';
import {Either, error, success} from '../fp';
import {JsonSerializable, JsonString} from './JsonSubject';
import {
  JSON_PARSE_ERROR,
  JSON_STRINGIFY_ERROR,
  JsonParseError,
  JsonStringifyError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';

export default class JsonImpl implements Json {
  constructor(
    private readonly _root: {readonly errorRepository: ErrorRepository},
  ) {}

  parse<T extends JsonSerializable = JsonSerializable>(
    source: JsonString<T>,
  ): Either<T, JsonParseError> {
    try {
      return success(JSON.parse(source));
    } catch (raw) {
      return error(
        this._root.errorRepository.create({kind: JSON_PARSE_ERROR, raw}),
      );
    }
  }

  stringify<T extends JsonSerializable = JsonSerializable>(
    source: T,
    space?: string | number,
  ): Either<JsonString<T>, JsonStringifyError> {
    try {
      return success(JSON.stringify(source, undefined, space) as JsonString<T>);
    } catch (raw) {
      return error(
        this._root.errorRepository.create({kind: JSON_STRINGIFY_ERROR, raw}),
      );
    }
  }
}
