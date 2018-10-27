const CountUp = require('./w-count-up/index');

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

const Confirm = options => {
  const component = getCtx('#wuss-confirm');
  return component.confirm(options);
};

const ActionSheet = {
  show: (options = {}) => {
    const component = getCtx('#wuss-actionsheet');
    return component.show(options);
  },
  hide: (options = {}) => {
    const component = getCtx('#wuss-actionsheet');
    return component.hide(options);
  },
};

const Loading = {
  show: (options = {}) => {
    const component = getCtx('#wuss-loading');
    return component.show(options);
  },
  hide: (options = {}) => {
    const component = getCtx('#wuss-loading');
    return component.hide(options);
  },
};

module.exports = {
  Toast,
  Alert,
  Confirm,
  Loading,
  CountUp,
  ActionSheet,
};
