/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:27 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 16:36:50
 */
import field from '../common/behavior/field';
Component({
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
      formType && this[formType]();
    },
    submit() {
      const fields = this.getRelationNodes('field');
      console.log('触发提交按钮');
      const obj = {};
      fields.forEach(e => {
        const { name, value } = e.data;
        obj[name] = value;
      });
      this.triggerEvent('submit', obj);
    },
  },
});
