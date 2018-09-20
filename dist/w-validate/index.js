import WussValidate from '../common/wuss-validate';
import field from '../common/behavior/field';
const FORM_PATH = '../w-form/index';
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  properties: {
    rules: {
      type: Object,
      value: {},
    },
  },
  relations: {
    field: {
      type: 'descendant',
      target: field,
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
      const { rules, first } = this.data;
      const [message = ''] = new WussValidate(rules).isValidate(value);
      this.setData({
        message,
        showIcon: !!message && !first && true,
        first: false,
        isError: !!message,
      });
      const form = this.getRelationNodes(FORM_PATH)[0];
      form && form.isAllValidate();
    },
    validateToast() {
      const { message } = this.data;
      this.selectComponent('#wuss-toast').show({ message });
    },
  },
});
