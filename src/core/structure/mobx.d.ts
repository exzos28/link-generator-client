import {Disposer} from './Service';

declare module 'mobx' {
  export interface IReactionDisposer extends Disposer {}
}
