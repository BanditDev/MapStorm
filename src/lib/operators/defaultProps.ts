import { OperatorFunction, Observable } from 'rxjs';
import { MapOperator } from 'rxjs/internal/operators/map';

type DefaultPropsType<T, R> = T & { defaultProps: () => R; props: R };

export function defaultProps<T, R>(
  defaultPropsFn: () => R,
  thisArg?: any,
): OperatorFunction<T, DefaultPropsType<T, R>> {
  return function renderOperation(
    source: Observable<T>,
  ): Observable<DefaultPropsType<T, R>> {
    if (typeof defaultPropsFn !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    return source.lift(
      new MapOperator(
        (conf: T) => ({
          ...conf,
          defaultProps: defaultPropsFn,
          props: defaultPropsFn(),
        }),
        thisArg,
      ),
    );
  };
}
