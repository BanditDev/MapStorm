export const applyTasks = (tasks, node) => {
  tasks.forEach(t => {
    switch (t.action) {
      case 'set':
        let id = t.target;
        if (t.name === 'textContent') {
          id = id.substr(0, id.length - 2);
        }

        console.log(
          '[task]: set ',
          t.name,
          ' on',
          id,
          'to',
          typeof t.value === 'function' ? `fn(${t.value.name})` : t.value,
        );

        document.getElementById(id)[t.name] = t.value;
        break;
      case 'create':
        const el = document.createElement(t.name);
        el.id = t.id;

        if (t.props !== null) {
          Object.keys(t.props).forEach(name => {
            const value = t.props[name];
            if (typeof value === 'function') {
              el.addEventListener(name.substr(2).toLowerCase(), value, false);
            } else {
              el[name] = value;
            }
          });
        }

        if (t.id === '0') {
          node.appendChild(el);
        } else {
          const parentId = t.id.substr(0, t.id.length - 2);
          const path = t.id.split('.');
          const parentNode = document.getElementById(parentId);

          path[path.length - 1]++;
          const nextEl = document.getElementById(path.join('.'));

          if (nextEl) {
            parentNode.insertBefore(el, nextEl);
          } else {
            parentNode.appendChild(el);
          }
        }

        break;
      case 'remove':
        console.log('[Task]: remove ', t.id);
        const n = document.getElementById(t.id);
        if (n) {
          n.remove();
        }
        break;
    }
  });
};
