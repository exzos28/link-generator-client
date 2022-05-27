import {computed} from 'mobx';
import {batchDisposers, Service} from '../structure';
import {Core} from './Core';
import {AppLifecycleService} from '../AppLifecycle';

export default class CoreService implements Core, Service {
  readonly appLifecycle = new AppLifecycleService();

  @computed get initialized() {
    return this.appLifecycle.initialized;
  }

  subscribe() {
    return batchDisposers(
      this.appLifecycle.subscribe(),
    );
  }
}
