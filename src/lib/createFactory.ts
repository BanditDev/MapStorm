import { Subject, OperatorFunction, Observable } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

export function createFactory(): [Subject<{}>, Observable<{}>];
export function createFactory<T, A>(
  op1: OperatorFunction<T, A>,
): [Subject<T>, Observable<A>];
export function createFactory<T, A, B>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
): [Subject<T>, Observable<B>];
export function createFactory<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
): [Subject<T>, Observable<C>];
export function createFactory<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
): [Subject<T>, Observable<D>];
export function createFactory<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
): [Subject<T>, Observable<E>];
export function createFactory<T, A, B, C, D, E, F>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
): [Subject<T>, Observable<F>];
export function createFactory<T, A, B, C, D, E, F, G>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
): [Subject<T>, Observable<G>];
export function createFactory<T, A, B, C, D, E, F, G, H>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
): [Subject<T>, Observable<H>];
export function createFactory<T, A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>,
): [Subject<T>, Observable<I>];
export function createFactory<T, A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>,
  ...operations: OperatorFunction<any, any>[]
): [Subject<T>, Observable<{}>];

export function createFactory(
  ...operations: OperatorFunction<any, any>[]
): [Subject<any>, Observable<any>] {
  const subject = new Subject();

  if (operations.length === 0) {
    return [subject, subject.asObservable()];
  }

  const observable = subject.asObservable();

  const $stream = observable.pipe(pipeFromArray(operations));

  return [subject, $stream];
}
