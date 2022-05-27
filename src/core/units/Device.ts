import {Opaque} from 'type-fest';
import {Uuid} from './Uuid';

export const DEVICE_ID = Symbol();
export type DeviceId = Opaque<Uuid, typeof DEVICE_ID>;
