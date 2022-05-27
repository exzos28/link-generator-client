export type Either<R, E> = Success<R> | Failure<E>;

export type Success<R> = {readonly success: true; readonly right: R};
export type Failure<E> = {readonly success: false; readonly left: E};

export function success<R>(value: R): Success<R>;
export function success(): Success<void>;
export function success<R>(value?: R) {
  return {
    success: true,
    right: value,
  };
}

export function error<E>(value: E): Failure<E> {
  return {
    success: false,
    left: value,
  };
}
