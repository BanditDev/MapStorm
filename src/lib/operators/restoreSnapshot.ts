import { map } from 'rxjs/operators';

export const restoreSnapshot = fn => {
  let isActive = true;
  return map(c => {
    if (isActive) {
      isActive = false;
      return {
        ...c,
        state: fn(),
      };
    } else {
      return c;
    }
  });
};
