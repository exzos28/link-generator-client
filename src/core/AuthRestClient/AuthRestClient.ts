import type {Opaque} from 'type-fest';

import {RestClient, RestClientCallError} from '../BaseRestClient';
import {Either} from '../fp';

export interface AuthRestClient extends RestClient {
    signIn(
        params: SignInParams,
    ): Promise<Either<AuthResponse, RestClientCallError<ErrorMessageResponse>>>;

    signUp(
        params: SignUpParams,
    ): Promise<Either<SignUpResponse, RestClientCallError<ErrorMessageResponse>>>;
}

export const JWT_STRING = Symbol();
export type JwtString = Opaque<string, typeof JWT_STRING>;

export const ACCESS_TOKEN = Symbol();
export type AccessToken = Opaque<JwtString, typeof ACCESS_TOKEN>;

export type SignInParams = {
    login: string;
    password: string;
};

export type SignUpParams = {
    login: string;
    password: string;
};

export type AuthResponse = {
    data: {
        token: {
            expiresIn: number,
            token: AccessToken
        },
    },
};

export type SignUpResponse = {
    data: {
        login: string,
        password: string,
    }
}

export type ErrorMessageResponse = {
    message: string;
}

