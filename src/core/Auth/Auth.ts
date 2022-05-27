import {Either} from '../fp';
import {PromiseState} from '../AsyncAtom';
import {GlobalError} from '../Error';
import {AccessToken, SignInParams, SignUpParams} from '../AuthRestClient';

export interface Auth {
    readonly state: PromiseState<AuthStateResult, GlobalError> | undefined;

    signInByCredentials(params: SignInParams): Promise<Either<AuthStateResult, GlobalError>>;
    signUpByCredentials(params: SignUpParams): Promise<Either<AuthStateResult, GlobalError>>;

    readonly initialized: boolean;
    readonly signOut: () => Promise<void>;
}

export type AuthStateResult = {
    accessToken: AccessToken;
};
