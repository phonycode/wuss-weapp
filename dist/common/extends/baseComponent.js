import Behavior from '../behavior/index';

export default (options = {}) => {
  
  options.options = {
    multipleSlots: true,
    addGlobalClass: true,
    ...options.options,
  };

  options.behaviors = [
    Behavior,
    ...(options.behaviors = options.behaviors || []),
  ];

  options.externalClasses = [
    'wuss-class',
    ...(options.externalClasses = options.externalClasses || []),
  ];

  return Component(options)
}