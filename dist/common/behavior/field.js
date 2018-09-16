/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:34 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-16 11:31:34
 */
module.exports = Behavior({
  // behaviors: ['wx://form-field'],
  properties: {
    defaultValue: {
      type: null,
      value: null,
    },
    name: {
      type: String,
      value: null,
    },
  },
  methods: {
    _resetAllValue() {
      const { value: _value, disable, readOnly, defaultValue = '' } = this.data;
      if (disable || readOnly) return false;
      const type = typeof _value;
      switch (type) {
        case 'string':
          this.setData({ value: defaultValue });
          break;
        case 'boolean':
          this.setData({ value: !!defaultValue });
          break;
        case 'object':
          this._emptyValue && this._emptyValue();
          break;
        default:
          break;
      }
    },
  },
});
