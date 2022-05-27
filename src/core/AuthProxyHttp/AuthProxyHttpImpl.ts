import {FULFILLED} from '../AsyncAtom';
import {Auth} from '../Auth';
import {NetworkError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either} from '../fp';
import {HttpImpl} from '../Http';

export default class AuthProxyHttpImpl extends HttpImpl {
    constructor(
        protected readonly _root: {
            readonly errorRepository: ErrorRepository;
            readonly auth: Auth;
        },
    ) {
        super(_root);
    }

    async fetch(
        input: RequestInfo,
        init?: RequestInit,
    ): Promise<Either<Response, NetworkError>> {
        const authState = this._root.auth.state;
        const token =
            authState?.status === FULFILLED
                ? authState.result.accessToken
                : undefined;

        const init_ = init ?? {};
        const newInit = {...init_};
        if (token) {
            newInit['headers'] = {
                ...init_.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        const response_ = await super.fetch(input, newInit);
        if (response_.success && response_.right.status === 401) {
            await this._root.auth.signOut();
        }
        return response_;
    }
}
