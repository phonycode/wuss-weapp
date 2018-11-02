/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:27 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-11-02 16:47:48
 */
import field from '../common/behavior/field';
const VALIDATE_PATH = '../w-validate/index';
const BUTTON_PATH = '../w-button/index';
Component({
  externalClasses: ['wuss-class'],
  properties: {
    isValidateBtn: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    addGlobalClass: true,
  },
  relations: {
    field: {
      type: 'descendant',
      target: field,
    },
    [BUTTON_PATH]: {
      type: 'descendant',
    },
    [VALIDATE_PATH]: {
      type: 'descendant',
    },
  },
  data: {
    canSubmit: true,
  },
  methods: {
    // 是否全部完成校验
    isAllValidate() {
      if (!this.data.isValidateBtn) return false;
      const validates = this.getRelationNodes(VALIDATE_PATH);
      const buttons = this.getRelationNodes(BUTTON_PATH);

      for (let i = 0; i < validates.length; i++) {
        if (validates[i].data.isError) {
          for (let j = 0; j < buttons.length; j++) {
            if (buttons[j].data.formType === 'submit') {
              buttons[j].setData({
                disabled: true,
              });
            }
          }
          return this.setData({
            canSubmit: false,
          });
        }
      }
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].data.formType === 'submit') {
          buttons[i].setData({
            disabled: false,
          });
        }
      }
      this.setData({
        canSubmit: true,
      });
    },
    // 有表单类型的按钮点击
    formTypeClick(formType) {
      const fields = this.getRelationNodes('field');
      formType && fields && this[formType](fields);
    },
    // 提交
    submit(fields) {
      if (!this.data.canSubmit) return false;
      const obj = {};
      fields.forEach(e => {
        let { name, value } = e.data;

        //判断是否有专门格式化获取value的函数
        e.getValue && (value = e.getValue(value));
        if (!!name) {
          obj[name] = value;
        }
      });
      this.triggerEvent('onSubmit', obj);
    },
    // 重置
    reset(fields) {
      fields.forEach(e => {
        e._resetAllValue();
      });
      this.triggerEvent('onReset', {});
    },
  },
});
