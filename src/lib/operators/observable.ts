export const observable = (object: object, subject, next) =>
  Object.keys(object).reduce(
    (acc: object, name) => ({
      ...acc,
      [name]: (...args) => {
        const result = object[name](...args);

        setTimeout(() => subject.next(next.component));

        return result;
      },
    }),
    {},
  );
