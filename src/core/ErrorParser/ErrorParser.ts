import {BaseError} from '../Error';

export interface ErrorParser {
  describe(error: BaseError): ErrorDetails;
}

export type ErrorDetails = {
  summary: string;
  details?: string;
};
