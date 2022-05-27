import {Disposer} from './Disposer';

export interface Service {
  subscribe(): Disposer | void;
}
