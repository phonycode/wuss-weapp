/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:27 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 17:12:29
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
      const fields = this.getRelationNodes('field');
      formType && fields && this[formType](fields);
    },
    submit(fields) {
      console.log('触发提交按钮');
      const obj = {};
      fields.forEach(e => {
        const { name, value } = e.data;
        obj[name] = value;
      });
      this.triggerEvent('submit', obj);
    },
    reset(fields) {
      console.log('触发重置按钮');
      fields.forEach(e => {
        e.setData({
          value: '',
        });
      });
      this.triggerEvent('reset', {});
    },
  },
});
