import { Observable, OperatorFunction } from 'rxjs';
import { MapOperator } from 'rxjs/internal/operators/map';

export function mapState<T extends { state: S }, R, S>(
  func: (comp: T) => S,
  thisArg?: any,
): OperatorFunction<T, S> {
  return function mapStateOperation(source: Observable<T>): Observable<S> {
    if (typeof func !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    return source.lift(new MapOperator((conf: T) => conf.state, thisArg));
  };
}
