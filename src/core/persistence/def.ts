import type {ReadonlyDeep} from 'type-fest';

import {Either, error, success} from '../fp';
import {SetterResult} from './common';

export default function def<T extends any = unknown>(key: string) {
    return [
        /**
         * @throws {never}
         */
        (): Either<T | null, unknown> => {
            try {
                const item = window.localStorage.getItem(key);
                return item === null
                    ? success(null)
                    : success(JSON.parse(item));
            } catch (raw) {
                return error(raw);
            }
        },
        /**
         * @throws {never}
         */
        (item?: ReadonlyDeep<T>): SetterResult => {
            try {
                if (item === undefined) {
                    window.localStorage.removeItem(key);
                } else {
                    window.localStorage.setItem(key, JSON.stringify(item));
                }
                return success(undefined);
            } catch (raw) {
                return error(raw);
            }
        },
    ] as const;
}
