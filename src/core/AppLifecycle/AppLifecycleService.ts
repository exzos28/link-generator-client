import {makeObservable, observable} from 'mobx';

import {APP_LIFECYCLE} from '../persistence';
import def from '../persistence/def';
import {Service} from '../structure';
import {AppLifecycle} from './AppLifecycle';

const [getAppLifecycle, setAppLifecycle] =
    def<AppLifeCycleRecord>(APP_LIFECYCLE);

export default class AppLifecycleService implements AppLifecycle, Service {
    @observable private _initialized = false;

    @observable private _record?: AppLifeCycleRecord;

    get initialized() {
        return this._initialized;
    }

    get hasJustBeenInstalled() {
        return this._record?.hasJustBeenInstalled ?? false;
    }

    constructor() {
        makeObservable(this);
    }

    private _load() {
        const record_ = getAppLifecycle();
        if (record_.success) {
            if (record_.right === null) {
                this._record = {hasJustBeenInstalled: true};
            } else {
                this._record = record_.right;
            }
        }
        this._initialized = true;
        if (this._record) {
            setAppLifecycle({...this._record, hasJustBeenInstalled: false});
        }
    }

    async purge() {
        await setAppLifecycle();
    }

    subscribe() {
        this._load();
        return undefined;
    }
}

interface AppLifeCycleRecord {
    hasJustBeenInstalled: boolean;
}
