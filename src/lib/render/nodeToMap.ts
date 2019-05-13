const subs = new Map();
export const nodeToMap = async (node, path = '0', store = new Map()) => {
  if (typeof node === 'object' && node.props) {
    node.propsMap = new Map();

    Object.keys(node.props).forEach(name => {
      node.propsMap.set(name, node.props[name]);
    });
  }

  if (node && typeof node.component === 'object' && node.component instanceof Array) {
    await new Promise(resolve => {
      node.store = store;
      node.resolve = resolve;

      if (!subs.has(path)) {
        node.component[1].subscribe(async c => {
          const n = c.render(c);
          await nodeToMap(n, path, c.store);
          c.resolve();
        });

        subs.set(path, node.component[0]);
      }

      subs.get(path).next(node);
    });

    return;
  }

  store.set(path, node);

  if (node && node.children && node.children.length > 0) {
    let i = 0;

    for (let n of node.children) {
      await nodeToMap(n, `${path}.${i++}`, store);
    }
  }

  return store;
};
