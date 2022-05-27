import {AuthService} from '../Auth';
import {AuthProxyHttpImpl} from '../AuthProxyHttp';
import {AuthRestClientImpl} from '../AuthRestClient';
import {Core} from '../Core';
import {ErrorParserImpl} from '../ErrorParser';
import {ErrorRepositoryImpl} from '../ErrorRepository';
import {HttpImpl} from '../Http';
import {JsonImpl} from '../Json';
import {JsonKeyValueMap, JsonKeyValueStoreImpl} from '../JsonKeyValueStore';
import {KeyValueMap, KeyValueStore, KeyValueStoreImpl} from '../KeyValueStore';
import {Service, batchDisposers} from '../structure';
import {Root} from './Root';
import DataRestClientImpl from "../DataRestClient/DataRestClientImpl";

export default class RootService implements Root, Service {
    constructor(protected readonly _core: Core) {}

    readonly http = new HttpImpl(this);
    readonly authProxyHttp = new AuthProxyHttpImpl(this);

    readonly errorRepository = new ErrorRepositoryImpl();
    readonly json = new JsonImpl(this);
    readonly errorParser = new ErrorParserImpl(this);
    readonly keyValueStore = new KeyValueStoreImpl<KeyValueMap>(this);
    readonly jsonKeyValueStore = new JsonKeyValueStoreImpl(
        this,
        this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
    );

    readonly dataRestClient = new DataRestClientImpl(this, this.authProxyHttp);

    readonly auth = new AuthService(this);

    readonly authRestClient = new AuthRestClientImpl(this);


    get appLifecycle() {
        return this._core.appLifecycle;
    }

    subscribe() {
        return batchDisposers(
            this.auth.subscribe(),
        );
    }
}
