import wussValidate from '../common/wuss-validate';
const defaultRules = {
  phone: {
    required: {
      value: true,
      message: '手机号必填',
    },
    regexp: {
      value: /^\d{11}$/,
      message: '手机号码格式不正确',
    },
  },
};
Component({
  properties: {
    rules: {
      type: Object,
      value: defaultRules,
    },
  },
  data: {
    showIcon: true,
  },
  methods: {
    isValidate() {
      return wussValidate(this.data.rules);
    },
    validateToast() {
      this.selectComponent('#wuss-toast').show({
        message: this.isValidate(),
      });
    },
  },
});
