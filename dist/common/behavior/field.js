/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-15 14:58:34 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 18:27:18
 */
module.exports = Behavior({
  // behaviors: ['wx://form-field'],
  properties: {
    name: {
      type: String,
      value: null,
    },
  },
  methods: {
    _resetAllValue() {
      const { value: _value, disable, readOnly } = this.data;
      if (disable || readOnly) return false;
      const type = typeof _value;
      switch (type) {
        case 'string':
          this.setData({ value: '' });
          break;
        case 'boolean':
          this.setData({ value: false });
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
