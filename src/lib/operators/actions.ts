import { merge, Observable, Subject, ObservableInput, ObservedValueOf, OperatorFunction, from, of } from "rxjs";
import { map, mapTo, tap, debounceTime } from "rxjs/operators";
import { MergeMapOperator } from "rxjs/internal/operators/mergeMap";
import { pipeFromArray } from "rxjs/internal/util/pipe";

// export const actions = (func: any) => <T>(source: Observable<T>) => {
//   const subject = new Subject();
//   const observable = subject.asObservable();

//   return merge(observable, source).pipe(
//     map(component => {
//       let next = {};
//       next.component = {...component, actions: observerable(func(component), subject, next)};

//       return next.component;
//     })
//   );
// };

type ObservableObject<T extends ObservableInput<any>> = {
  [K: string]: T
}

/*
const obj = {
    name: 'Alex',
    age: 27
}

type Obs<T> = () => T
type Obj = typeof obj;
type Names = [keyof Obj];
type Values = {
    [K in keyof Obj]: Obs<Obj[K]>
};

const names = Object.keys(obj) as Names;
const values = names.reduce(
    (acc, name) => [...acc, () => obj[name]], []
) as Values;
*/

type ValueOf<T> = T[keyof T];

export function actions<T, R, O extends ObservableObject<any>>(
  project: (c: T) => O,
  resultSelector?: number,
  concurrent: number = Number.POSITIVE_INFINITY
): OperatorFunction<T, ObservedValueOf<O>|R> {

    return (source: Observable<T>) => source.lift(new MergeMapOperator((conf) => {
      const actionsObject = project(conf);
      const actionNames = Object.keys(actionsObject); // as (keyof (typeof actionsObject));
      const actionsStreamList = actionNames.reduce((acc, name) => {
            const subject = new Subject();
            const observable = subject.asObservable();
            const acts = [...actionsObject[name], mapTo(conf)];
            const stream = observable.pipe(pipeFromArray(acts));

            return [
              ...acc,
              {
                stream,
                subject,
                name
              }
            ]
          },
          []
      );

      const actionStreams = actionsStreamList.reduce(
        (acc, act: any) => ([...acc, act.stream]), []);

      const actions = actionsStreamList.reduce((acc, act) => ({
        ...acc, [act.name]: v => {
        act.subject.next(v)
      }}), {});


    return merge(...actionStreams, of(conf)).pipe(mapTo({...conf, actions}))
  }, concurrent));
}