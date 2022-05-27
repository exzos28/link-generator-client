export const PENDING = Symbol();
export const FULFILLED = Symbol();
export const REJECTED = Symbol();

export type PromiseState<R, E> =
  | {readonly status: typeof PENDING}
  | {readonly status: typeof FULFILLED; readonly result: R}
  | {readonly status: typeof REJECTED; readonly error: E};
