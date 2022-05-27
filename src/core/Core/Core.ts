import {AppLifecycle} from '../AppLifecycle';

export interface Core {
  readonly initialized: boolean;
  readonly appLifecycle: AppLifecycle;
}
