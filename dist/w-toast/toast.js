const Toast = {
  show: (opts = {},ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
    const componentCtx = ctx.selectComponent('#wuss-toast');

    if (!componentCtx) {
      throw new Error(`无法找到id为 wuss-toast 组件`);
    }
    
    return componentCtx.show(opts);
  },
};
export default Toast;
