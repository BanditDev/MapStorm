import { Observable, OperatorFunction } from 'rxjs';
import { MapOperator } from 'rxjs/internal/operators/map';

export function toState<T, R>(thisArg?: any): OperatorFunction<T, T> {
  return function toStateOperation(source: Observable<T>): Observable<T> {
    return source.lift(
      new MapOperator(function(conf: T) {
        return conf;
      }, thisArg),
    );
  };
}
