export const createJsx = (component: any, props, ...children) => ({
  component,
  props,
  children: children.reduce((acc, v) => (Array.isArray(v) ? [...acc, ...v] : [...acc, v]), [])
});
