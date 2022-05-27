import {AppLifecycle} from '../AppLifecycle';
import {Auth} from '../Auth';
import {AuthRestClient} from '../AuthRestClient';
import {ErrorParser} from '../ErrorParser';
import {ErrorRepository} from '../ErrorRepository';
import {JsonKeyValueMap, JsonKeyValueStore} from "../JsonKeyValueStore";
import {DataRestClient} from "../DataRestClient";

export interface Root {
    readonly errorParser: ErrorParser;
    readonly errorRepository: ErrorRepository;
    readonly auth: Auth;
    readonly authRestClient: AuthRestClient;
    readonly appLifecycle: AppLifecycle;
    readonly dataRestClient: DataRestClient;
    readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
}
