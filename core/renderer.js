export function mountElement(vnode, containter) {
  const { tag, props, children } = vnode;
  const dom = document.createElement(tag);
  for (const key in props) {
    const element = props[key];
    dom.setAttribute(key, element);
  }
  if (Array.isArray(children)) {
    children.forEach((child) => {
      mountElement(child, dom);
    });
  } else if (typeof children === "string") {
    dom.textContent = children;
  }
  containter.append(dom);
}
