import {computed, makeObservable, observable, runInAction} from 'mobx';

import {FULFILLED, PENDING, REJECTED} from '../AsyncAtom';
import {AuthResponse, AuthRestClient, SignInParams, SignUpParams, SignUpResponse} from '../AuthRestClient';
import {GlobalError, NOT_AUTHORIZED_ERROR, NotAuthorizedError} from '../Error';
import {ErrorRepository} from '../ErrorRepository';
import {Either, error, success} from '../fp';
import {Service} from '../structure';
import {Auth, AuthStateResult} from './Auth';
import {JsonKeyValueMap, JsonKeyValueStore} from "../JsonKeyValueStore";
import {AUTH} from "../persistence";

export default class AuthService implements Auth, Service {
    @observable private _state?: Auth['state'];

    constructor(
        private readonly _root: {
            readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
            readonly errorRepository: ErrorRepository;
            readonly authRestClient: AuthRestClient;
        },
    ) {
        makeObservable(this);
    }

    get state() {
        return this._state;
    }

    private _setState(state: Auth['state']) {
        runInAction(() => {
            this._state = state;
        });
    }

    private static _translateAuthResult(_: AuthResponse): AuthStateResult {
        return {
            accessToken: _.data.token.token,
        };
    }

    private async _signInByCredentials(
        params: SignInParams,
    ): Promise<Either<AuthStateResult, GlobalError>> {
        const signIn_ = await this._root.authRestClient.signIn(params);
        if (!signIn_.success) {
            return error(
                this._root.authRestClient.generalizeError(signIn_.left),
            );
        }
        const result = AuthService._translateAuthResult(signIn_.right);
        const set_ = await this._root.jsonKeyValueStore.set(AUTH, {
            accessToken: signIn_.right.data.token.token,
        });
        if (!set_.success) {
            return set_;
        }
        return success(result);
    }

    private async _signUpByCredentials(
        params: SignInParams,
    ): Promise<Either<SignUpResponse, GlobalError>> {
        const signUp_ = await this._root.authRestClient.signUp(params);
        if (!signUp_.success) {
            return error(
                this._root.authRestClient.generalizeError(signUp_.left),
            );
        }
        return signUp_;
    }

    async signInByCredentials(
        params: SignInParams,
    ): Promise<Either<AuthStateResult, GlobalError>> {
        this._setState({status: PENDING});
        const state_ = await this._signInByCredentials(params);
        if (state_.success) {
            this._setState({status: FULFILLED, result: state_.right});
        } else {
            this._setState({status: REJECTED, error: state_.left});
        }
        return state_;
    }

    async signUpByCredentials(
        params: SignUpParams,
    ): Promise<Either<AuthStateResult, GlobalError>> {
        this._setState({status: PENDING});
        const signUp_ = await this._signUpByCredentials(params);
        if (signUp_.success) {
            return await this.signInByCredentials(params);
        } else {
            this._setState({status: REJECTED, error: signUp_.left});
        }
        return signUp_;
    }

    @computed
    get initialized() {
        return this._state !== undefined;
    }


    private async _fetchCurrentAuthState(): Promise<
        Either<AuthStateResult, GlobalError>
        > {
        const record_ = await this._root.jsonKeyValueStore.get(AUTH);
        if (!record_.success) {
            return record_;
        }
        if (!record_.right) {
            return error<NotAuthorizedError>(
                this._root.errorRepository.create({kind: NOT_AUTHORIZED_ERROR}),
            );
        }
        return success({
            accessToken: record_.right.accessToken,
        });
    }

    async restore() {
        this._setState({status: PENDING});
        const state_ = await this._fetchCurrentAuthState();
        if (state_.success) {
            this._setState({status: FULFILLED, result: state_.right});
        } else {
            this._setState({status: REJECTED, error: state_.left});
        }
        return state_;
    }

    private async _signOut() {
        await this._root.jsonKeyValueStore.delete(AUTH);
        this._setState({
            status: REJECTED,
            error: {
                kind: NOT_AUTHORIZED_ERROR,
                description: 'Not authorized',
                raw: new Error(),
            },
        });
    }

    readonly signOut = () => this._signOut();

    subscribe() {
        // noinspection JSIgnoredPromiseFromCall
        this.restore();
        return undefined;
    }
}
