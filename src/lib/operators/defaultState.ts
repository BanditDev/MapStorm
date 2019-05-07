import { MapOperator } from 'rxjs/internal/operators/map';
import { Observable, OperatorFunction } from 'rxjs';

type DefaultStateType<T, R> = T & { state: R };

export function defaultState<T, R>(
  state: R,
  thisArg?: any,
): OperatorFunction<T, DefaultStateType<T, R>> {
  return function renderOperation(
    source: Observable<T>,
  ): Observable<DefaultStateType<T, R>> {
    if (typeof state !== 'object') {
      throw new TypeError('argument is not a object.');
    }

    let isActive = true;
    return source.lift(
      new MapOperator((conf: T) => {
        if (isActive && conf) {
          isActive = false;
          return { ...conf, state };
        } else {
          return conf as DefaultStateType<T, R>;
        }
      }, thisArg),
    );
  };
}
