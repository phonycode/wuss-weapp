module.exports = Behavior({
  behaviors: [],
  properties: {

  },
  data: {

  },
  attached: function () {},
  methods: {
    /**
     * 
     * @param {string} v 要格式化的单位
     * @param {string} unit 无单位时补充的单位
     * @param {string} r 要替换的单位
     */
    formatUnit(v,unit,r) {
      const units = ['px','rpx','%','rm','rem'];
      if(!v)return '';
      let x = '';
      return !!units.reduce((p,n) => {
        if(String(v).indexOf(n) > -1) {
          p+=1;
          x = n;
        }
        return p;
      },0) ? r != null || r != undefined ? v.replace(new RegExp(x,'g'),'') + r : v :  v + unit;
    },
    /**
     * 判断是否是数组对象 [{},{},{}....]
     * @param {array} arry 
     */
    isArrayObject(arry) {
      return Array.isArray(arry) && arry.length >0 && Object.prototype.toString.call(arry[0]) === '[object Object]'
    },
    /**
     * 删除数组中指定的键值并返回新数组
     * @param {array} any 当前传入的数组或数组对象
     * @param {string} key 当前需要删除的键值
     */
    empty(any, key) {
      if (!key) return any;
      if (Array.isArray(any)) {
        return Object.keys(any).map(i => {
          delete any[i][key];
          return any[i];
        });
      } else if (typeof any === 'object') {
        const empty_obj = Object.assign({}, any);
        delete empty_obj[key];
        return empty_obj;
      }
    },
  }
})