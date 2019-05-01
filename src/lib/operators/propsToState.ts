import { Observable, OperatorFunction } from "rxjs";
import { MapOperator } from "rxjs/internal/operators/map";

type PropsToStateType<T, R> = T & { state: R }

export function propsToState<T extends { state: S; }, R, S>(func: (comp: T) => R, thisArg?: any): OperatorFunction<T, PropsToStateType<T, R>> {
  return function renderOperation(source: Observable<T>): Observable<PropsToStateType<T, R>> {
    if (typeof func !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    let isActive = true;

    return source.lift(
      new MapOperator((conf: T) => {

        if (isActive) {
          isActive = false;

          return {
            ...conf,
            state: {
              ...conf.state,
              ...func(conf)
            }
          };
        } else {
          return conf as PropsToStateType<T, R>;
        }
      }, thisArg
      )
    );
  };
}
