/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:27 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-20 10:00:31
 */
import field from '../common/behavior/field';
const VALIDATE_PATH = '../w-validate/index';
const BUTTON_PATH = '../w-button/index';
Component({
  externalClasses: ['wuss-class'],
  properties: {},
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
  methods: {
    isAllValidate() {
      const validates = this.getRelationNodes(VALIDATE_PATH);
      const buttons = this.getRelationNodes(BUTTON_PATH);
      for (let i = 0; i < validates.length; i++) {
        if (validates[i].data.showIcon) {
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
    formTypeClick(formType) {
      const fields = this.getRelationNodes('field');
      formType && fields && this[formType](fields);
    },
    submit(fields) {
      console.log('触发提交按钮');
      const obj = {};
      fields.forEach(e => {
        let { name, value } = e.data;
        if (!!name) {
          obj[name] = value;
        }
      });
      this.triggerEvent('submit', obj);
    },
    reset(fields) {
      console.log('触发重置按钮');
      fields.forEach(e => {
        e._resetAllValue();
      });
      this.triggerEvent('reset', {});
    },
  },
});
