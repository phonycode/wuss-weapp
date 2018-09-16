/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:27 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-16 09:57:08
 */
import field from '../common/behavior/field';
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
    '../w-button/index': {
      type: 'descendant',
    },
  },
  methods: {
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
