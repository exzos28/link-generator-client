import {AccessToken} from '../AuthRestClient';
import {JsonString} from "../Json";
import {AUTH} from "../persistence";

export type KeyValueMap = {
    [K in string]: string;
} & {
    [AUTH]: JsonString<AuthRecord>;
};

export type AuthRecord = {accessToken: AccessToken};
