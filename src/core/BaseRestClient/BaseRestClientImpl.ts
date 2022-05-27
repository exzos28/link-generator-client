import * as queryString from 'querystring';

import {
    GENERAL_REST_CLIENT_ERROR,
    GeneralRestClientError,
    GlobalError,
    TIMEOUT_ERROR,
    TimeoutError,
} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Http} from '../Http';
import {Json, JsonSerializable} from '../Json';
import {Millisecond} from '../Time';
import {Url} from '../units';
import {delayResolve} from '../util';
import {
    RestClientCallError,
    RestMethod,
    SPECIALIZED_REST_CLIENT_ERROR,
    SpecializedRestClientError,
} from './RestClient';

export type CallContentType = 'application/json' | 'multipart/form-data';

export default abstract class BaseRestClientImpl {
    protected constructor(
        protected readonly _root: {
            readonly errorRepository: ErrorRepository;
            readonly json: Json;
        },
        protected readonly _http: Http,
    ) {}

    protected abstract get _base(): Url;

    protected abstract get _timeout(): Millisecond;

    protected async _call<
        M extends RestMethod = RestMethod,
        R extends JsonSerializable | void = JsonSerializable | void,
        E extends JsonSerializable = JsonSerializable,
    >(
        method: M,
        endpoint: Url,
        params?: any, // FIXME
        callContentType: CallContentType = 'application/json',
        headers: HeadersInit = {},
    ): Promise<Either<R, RestClientCallError<E>>> {
        let body;
        let query;
        if (params) {
            if (method === 'GET') {
                query = queryString.stringify(params);
            } else {
                if (callContentType === 'application/json') {
                    const body_ = await this._root.json.stringify(params);
                    if (!body_.success) {
                        return body_;
                    }
                    body = body_.right;
                } else if (callContentType === 'multipart/form-data') {
                    body = params;
                }
            }
        }
        let _headers: HeadersInit = headers;
        if (callContentType === 'application/json') {
            _headers = {
                ..._headers,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            };
        }
        const endpoint_ =
            method === 'GET' && query !== undefined && query !== ''
                ? `${endpoint}?${query}`
                : endpoint;
        const fetchPromise = this._http.fetch(`${this._base}${endpoint_}`, {
            method,
            headers: _headers,
            body,
        });
        const response_ =
            this._timeout === undefined || !isFinite(this._timeout)
                ? await fetchPromise
                : await Promise.race([
                      fetchPromise,
                      delayResolve(this._timeout, () =>
                          error(
                              this._root.errorRepository.create<TimeoutError>({
                                  kind: TIMEOUT_ERROR,
                                  description: `REST ${method} ${endpoint} failed with timeout`,
                              }),
                          ),
                      ),
                  ]);
        if (!response_.success) {
            return response_;
        }
        const response = response_.right;
        let responseBody;
        try {
            responseBody = await response.json();
        } catch (ignore) {}
        if (response.ok) {
            return success(responseBody as R);
        }
        return error(
            this._root.errorRepository.create<SpecializedRestClientError<E>>({
                kind: SPECIALIZED_REST_CLIENT_ERROR,
                description: `The REST method ${endpoint} failed with the code ${response.status}`,
                statusCode: response.status,
                body: responseBody,
            }),
        );
    }

    generalizeError(
        e: GlobalError | SpecializedRestClientError,
    ): GeneralRestClientError {
        if (e.kind === SPECIALIZED_REST_CLIENT_ERROR) {
            return this._root.errorRepository.create<GeneralRestClientError>({
                ...e,
                kind: GENERAL_REST_CLIENT_ERROR,
            });
        }
        // Lame return type to win Typescript. Perfectly, should remain GlobalError.
        return e as GeneralRestClientError;
    }
}
