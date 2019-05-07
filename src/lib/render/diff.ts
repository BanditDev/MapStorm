export const diff = (
  node1: Map<string, any>,
  node2: Map<string, any>,
  isRoot = false,
) => {
  const tasks = new Set();

  node1.forEach((_, key) => {
    if (node1.has(key) && node2.has(key)) {
      const v1 = node1.get(key);
      const v2 = node2.get(key);

      if (typeof v2 === 'string' && v1 !== v2) {
        return tasks.add({
          action: 'set',
          value: v1,
          name: 'textContent',
          target: key,
        });
      }

      if (v1.component !== v2.component) {
        if (typeof v1 !== 'boolean' && typeof v2 !== 'boolean') {
          return void tasks.add({
            action: 'replace',
            prev: v1,
            next: v2,
          });
        }

        if (typeof v2 === 'boolean') {
          return void tasks.add({
            action: 'create',
            name: v1.component,
            props: v1.props,
            id: key,
          });
        } else {
          return void tasks.add({
            action: 'remove',
            id: key,
          });
        }
      }

      if (v1.props !== v2.props) {
        if (v1.propsMap && v2.propsMap) {
          v1.propsMap.forEach((v, name) => {
            const prevVal = v2.propsMap.get(name);

            if (v !== prevVal) {
              tasks.add({
                action: 'set',
                value: v,
                name: name,
                target: key,
              });
            }
          });
        }

        return;
      }
    } else {
      const v1 = node1.get(key);

      if (v1 === undefined || v1 === null || typeof v1 === 'boolean') {
        if (node2.has(key)) {
          tasks.add({
            action: 'remove',
            id: key,
          });
        }
        return;
      }

      if (typeof v1.component === 'string') {
        tasks.add({
          action: 'create',
          name: v1.component,
          props: v1.props,
          id: key,
        });
      } else if (typeof v1 === 'string') {
        tasks.add({
          action: 'set',
          value: v1,
          name: 'textContent',
          target: key,
        });
      }
    }
  });

  if (isRoot) {
    node1.forEach((c, key) => {
      if (c && c.props && 'key' in c.props) {
        const f = Array.from(node2).find(
          ([_, component]) => component.props && component.props.key === c.props.key,
        );

        if (f) {
          node2.delete(key);
        }
        return;
      }

      if (node2.has(key)) {
        node2.delete(key);
      }
    });

    node2.forEach((_, key) =>
      tasks.add({
        action: 'remove',
        id: key,
      }),
    );
  }

  return tasks;
};
