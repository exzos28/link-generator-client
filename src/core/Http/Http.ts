import type {Opaque} from 'type-fest';

import {GlobalError} from '../Error';
import {Either} from '../fp';
import {RouterSource} from '../structure';

export const REQUEST = Symbol();
export const RESPONSE = Symbol();
export const RESPONSE_BODY = Symbol();

export interface Http {
    fetch(
        input: RequestInfo,
        init?: RequestInit,
    ): Promise<Either<Response, GlobalError>>;
    readonly io: RouterSource<{
        [REQUEST]: (params: RequestParams) => void;
        [RESPONSE]: (params: ResponseParams) => void;
        [RESPONSE_BODY]: (params: ResponseBodyParams) => void;
    }>;
}

export interface RequestParams {
    correlationId: CorrelationId;
    input: RequestInfo;
    init?: RequestInit;
}

export interface ResponseParams {
    correlationId: CorrelationId;
    response: Response;
}

export interface ResponseBodyParams {
    correlationId: CorrelationId;
    responseBody: string;
}

export const CORRELATION_ID = Symbol();
export type CorrelationId = Opaque<number, typeof CORRELATION_ID>;
