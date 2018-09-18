import WussValidate from '../common/wuss-validate';
import field from '../common/behavior/field';
Component({
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
  },
  data: {
    showIcon: false,
  },
  methods: {
    isValidate(value) {
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
    },
    validateToast() {
      const { message } = this.data;
      this.selectComponent('#wuss-toast').show({ message });
    },
  },
});
