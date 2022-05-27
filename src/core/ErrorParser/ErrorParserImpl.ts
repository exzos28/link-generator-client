import {compact, omit} from 'lodash';
import {ErrorParser, ErrorDetails} from './ErrorParser';
import {BaseError} from '../Error';
import {Json} from '../Json';

export default class ErrorParserImpl implements ErrorParser {
  constructor(private readonly _root: {readonly json: Json}) {}

  describe(error: BaseError): ErrorDetails {
    const summary = error.description;
    let originalName;
    let originalMessage;
    if (error.raw instanceof Error) {
      originalName = error.raw.name;
      originalMessage = error.raw.message;
    }
    let remainder;
    const remainingObject = omit(error, ['kind', 'description', 'raw']);
    const remainingKeys = Object.keys(remainingObject);
    if (remainingKeys.length > 0) {
      const remainder_ = this._root.json.stringify(remainingObject, 2);
      remainder = remainder_.success
        ? remainder_.right
        : 'Error details cannot be presented';
    }
    const header = compact([
      `[${originalName}]`,
      originalMessage === summary ? undefined : originalMessage,
    ]).join(': ');
    const details = compact([header, remainder]).join('\n');
    return {summary, details};
  }
}
