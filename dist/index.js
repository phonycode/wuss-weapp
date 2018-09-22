const getCurrentPage = () => {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

const getCtx = selector => {
  const page = getCurrentPage();
  const component = page.selectComponent(selector);
  if (!component) {
    throw Error(`无法找到对应的组件: ${selector}`);
  }
  return component;
};

const Toast = {
  show: (opts = {}) => {
    const componentCtx = getCtx('#wuss-toast');
    return componentCtx.show(opts);
  },
};

const Alert = options => {
  const component = getCtx('#wuss-alert');
  return component.alert(options);
};

module.exports = {
  Toast,
  Alert,
};
