import { OperatorFunction, Observable } from 'rxjs';
import { MapOperator } from 'rxjs/internal/operators/map';

type RenderType<T, R> = T & { render: (conf: T) => R };

export function render<T, R>(
  renderFn: (conf: T) => R,
  thisArg?: any,
): OperatorFunction<T, RenderType<T, R>> {
  return function renderOperation(source: Observable<T>): Observable<RenderType<T, R>> {
    if (typeof renderFn !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    return source.lift(
      new MapOperator(
        (conf: T) => ({
          ...conf,
          render: renderFn,
        }),
        thisArg,
      ),
    );
  };
}
