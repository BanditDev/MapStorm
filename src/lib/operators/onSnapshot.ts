import { tap } from 'rxjs/operators';

export const onSnapshot = (func: <C>(component: C, prevComponent: C) => void) =>
  tap(component => {
    func(component, component);
  });
