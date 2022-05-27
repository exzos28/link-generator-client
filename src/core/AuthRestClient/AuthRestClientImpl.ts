import {
    BaseRestClientImpl,
    RestClientCallError,
} from '../BaseRestClient';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {Http} from '../Http';
import {Json} from '../Json';
import {Millisecond} from '../Time';
import {Url} from '../units';
import {
    AuthResponse,
    AuthRestClient, ErrorMessageResponse,
    SignInParams, SignUpParams, SignUpResponse,
} from './AuthRestClient';

export default class AuthRestClientImpl
    extends BaseRestClientImpl
    implements AuthRestClient
{
    constructor(
        protected readonly _root: {
            readonly errorRepository: ErrorRepository;
            readonly http: Http;
            readonly json: Json;
        },
    ) {
        super(_root, _root.http);
    }

    protected get _base() {
        return process.env.REACT_APP_API_URL as Url;
    }

    protected get _timeout() {
        return 10000 as Millisecond;
    }

    async signIn(
        params: SignInParams,
    ): Promise<Either<AuthResponse, RestClientCallError<ErrorMessageResponse>>> {
        return this._call('POST', 'login' as Url, params);
    }

    async signUp(
        params: SignUpParams,
    ): Promise<Either<SignUpResponse, RestClientCallError<ErrorMessageResponse>>> {
        return this._call('POST', 'signup' as Url, params);
    }
}
