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
      observer() {
        this.isValidate(this.data.value);
      },
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
  },
  methods: {
    isValidate(value) {
      if (!value) return;
      this.setData({ value });
      const wussValidate = new WussValidate(this.data.rules);

      const result = wussValidate.isValidate(value);

      if (result.length && result[0]) {
        this.setData({
          message: result[0],
          showIcon: true,
        });
      } else {
        this.setData({
          message: '',
          showIcon: false,
        });
      }
      this.getRelationNodes(FORM_PATH)[0].isAllValidate();
    },
    validateToast() {
      const { message } = this.data;
      this.selectComponent('#wuss-toast').show({ message });
    },
  },
});
