import type {Opaque} from 'type-fest';

export const UNKNOWN_CONTEXT = Symbol();

export type Bound<
    F extends Function,
    C extends any = typeof UNKNOWN_CONTEXT,
> = F extends Opaque<F> ? F : Opaque<F, C>;

function bind<F extends Function, C extends any>(f: F, context: C): Bound<F, C>;
function bind<F extends Function>(f: F): Bound<F>;
function bind<F extends Function, C extends any = typeof UNKNOWN_CONTEXT>(
    f: F,
    context?: C,
): Bound<F, C> | Bound<F> {
    return f.bind(context) as Bound<F, C>;
}

export default bind;
