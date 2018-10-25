import Behavior from '../common/behavior/index';

Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件间关系定义
   */
  relations: {},

  /**
   * 组件选项
   */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {array} options 传入的选项组[ [], [], [] ]
   * @param {string} cancelTextColor 默认值 可以支持 key value 例: [value,value,value...] 或 [key,key,key...]
   * @param {string} cancelText 取消文本文字
   * @param {string} title 标题
   * @param {string} confirmTextColor 确认文本颜色
   * @param {string} confirmText 确认文本文字
   * @param {string} showValue 是否用value而不是key展示
   * @param {string} defaultKey onChange和onSelect事件返回的值是何种格式 [value,value...] [key,key,...]
   */
  properties: {
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: Array,
      value: [],
    },
    cancelTextColor: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    label: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    confirmTextColor: {
      type: String,
      value: '',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    showValue: {
      type: Boolean,
      value: false,
    },
    defaultKey: {
      type: String,
      value: 'value',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _visible: false,
    value: [0, 0, 0],
  },

  /**
   * 组件方法列表
   */
  methods: {
    _handleClick() {
      this.setData({
        _visible: true,
      })
    },
    _handleCancel() {
      this.setData({
        _visible: false,
      })
    },
    _handleConfirm() {
      const { value } = this.data;
      this.setData({
        _visible: false,
      })
      // this.triggerEvent('onSelect',{
      //   value: this.getValues(value),
      // },{})
    },
    _ArrayKeysToArrayObject() {
      const {
        options,
      } = this.data;
      if (options.length <= 0) return false;
      const {
        0: items
      } = options;
      const _isArrayObject = this.isArrayObject(items);
      if (!_isArrayObject) {
        const newOptions = [];
        options.forEach(i => {
          let arr = [];
          i.forEach(j => {
            arr.push({
              key: j,
              value: j,
            })
          })
          newOptions.push(arr)
        });
        this.setData({
          options: newOptions,
        })
      }
    },
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({
        value,
      })
      // this.triggerEvent('onChange',{
      //   value: this.getValues(value),
      // },{})
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  created: function () {},

  /**
   * 组件布局完成后执行
   */
  ready: function () {
    const {
      options,
    } = this.data;
    this.setData({
      _isLinkage: JSON.stringify(options).indexOf('parent') > -1,
    })
    this._ArrayKeysToArrayObject()
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached: function () {},

  /**
   * 在组件实例被移动到节点树另一个位置时执行
   */
  moved: function () {},

})