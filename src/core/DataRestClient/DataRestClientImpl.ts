import {BaseRestClientImpl, RestClientCallError} from '../BaseRestClient';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Http} from '../Http';
import {Json} from '../Json';
import {Millisecond} from '../Time';
import {Url} from '../units';
import {
    DataRestClient,
    CreateUrlRequest,
    CreateUrlResponse,
    DeleteUrlRequest,
    EditUrlRequest,
    EditUrlResponse,
    GetUrlsResponse, GetVisitsResponse,
} from './DataRestClient';

export default class DataRestClientImpl
    extends BaseRestClientImpl
    implements DataRestClient
{
    constructor(
        protected readonly _root: {
            readonly errorRepository: ErrorRepository;
            readonly json: Json;
        },
        readonly http: Http,
    ) {
        super(_root, http);
    }

    protected get _base(): Url {
        return `${process.env.REACT_APP_API_URL}` as Url;
    }

    protected get _timeout(): Millisecond {
        return 10000 as Millisecond;
    }

    async getUrls(): Promise<Either<GetUrlsResponse, RestClientCallError>> {
        return this._call('GET', 'urls/find' as Url);
    }

    async createUrl(
        params: CreateUrlRequest,
    ): Promise<Either<CreateUrlResponse, RestClientCallError>> {
        return this._call('POST', 'urls/create' as Url, params);
    }

    async editUrl(
        params: EditUrlRequest,
    ): Promise<Either<EditUrlResponse, RestClientCallError>> {
        return this._call('PUT', `urls/${params.id}` as Url, params.url);
    }

    async deleteUrl(
        params: DeleteUrlRequest,
    ): Promise<Either<void, RestClientCallError>> {
        return this._call('DELETE', `urls/${params.id}` as Url);
    }

    async getVisits(): Promise<Either<GetVisitsResponse, RestClientCallError>> {
        return this._call('GET', 'visits/find' as Url);
    }
}
