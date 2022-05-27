import type {Opaque} from 'type-fest';

import {RestClientCallError} from '../BaseRestClient';
import {Either} from '../fp';

export interface DataRestClient {
    getUrls(): Promise<Either<GetUrlsResponse, RestClientCallError>>;

    createUrl(params: CreateUrlRequest): Promise<Either<CreateUrlResponse, RestClientCallError>>;

    editUrl(
        params: EditUrlRequest,
    ): Promise<Either<EditUrlResponse, RestClientCallError>>;

    deleteUrl(
        params: DeleteUrlRequest,
    ): Promise<Either<void, RestClientCallError>>;

    getVisits(): Promise<Either<GetVisitsResponse, RestClientCallError>>;
}

// # ROLES
const URL_ID = Symbol();
export type UrlId = Opaque<string, typeof URL_ID>;

export type Url = {
    _id: UrlId;
    origUrl: string;
    shortUrl: string;
    clicks: number;
    createdBy: string;
};

export type EditableUrl = Omit<Url, '_id'>;

export type GetUrlsResponse = {
    data: Url[]
}
export type CreateUrlRequest = {
    url: string;
};
export type CreateUrlResponse = Url;
export type EditUrlRequest = {
    id: UrlId;
    url: {
        origUrl: string;
    };
};
export type EditUrlResponse = Url;
export type DeleteUrlRequest = {
    id: UrlId;
};


const VISIT_ID = Symbol();
export type VisitId = Opaque<string, typeof VISIT_ID>;

export type Visit = {
    _id: VisitId;
    ip: string;
    country: string;
    region: string;
    timezone: string;
    city: string;
    ll: [number, number];
    area: number;
    urlId: string;
    url: Url;
};

export type GetVisitsResponse = {
    data: Visit[]
}
// #
