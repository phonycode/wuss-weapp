import WussComponent from '../common/extends/baseComponent';
import WussValidate from '../common/wuss-validate';
import field from '../common/behavior/field';
const FORM_PATH = '../w-form/index';

WussComponent({
  /**
   * @param {object} rules 规则
   * @param {boolean} firstValidate 是否需要初始化校验
   */
  properties: {
    rules: Object,
    firstValidate: Boolean,
  },
  externalClasses: ['wuss-validate-icon'],
  relations: {
    field: {
      type: 'descendant',
      target: field,
      linked(t) {
        this.setData({
          _node: t,
        });
      },
    },
    [FORM_PATH]: {
      type: 'ancestor',
    },
  },
  data: {
    showIcon: false,
    first: true,
    isError: false,
  },
  methods: {
    isValidate(value) {
      if (value === void 666) return false;
      const { rules, first, firstValidate, _node } = this.data;
      const [message = ''] = new WussValidate(rules).isValidate(value);
      if (!!firstValidate && first) {
        this.setData({
          message,
          showIcon: !!message,
          first: false,
          isError: !!message,
        });
        _node.setData({
          __showIcon: !!message,
        });
      } else {
        this.setData({
          message,
          showIcon: !!message && !first && true,
          first: false,
          isError: !!message,
        });
        _node.setData({
          __showIcon: !!message && !first && true,
        });
      };
      const form = this.getRelationNodes(FORM_PATH)[0];
      form && form.isAllValidate();
    },
    validateToast() {
      const { message } = this.data;
      this.selectComponent('#wuss-toast').show({ message });
    },
  },
});
