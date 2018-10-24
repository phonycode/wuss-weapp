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
  options: {},

  /**
   * 组件间关系定义
   */
  behaviors: [Behavior],

  /**
   * 组件的属性列表
   * @param {number} defaultValue 当前默认值
   * @param {number} max 最大值
   * @param {number} min 最小值
   * @param {number} width 当前输入框宽度
   * @param {number} steps 步进数
   * @param {boolean} fillable 是否可填写
   * @param {string} buttonType 按钮样式，可选[box/circle]
   * @param {boolean} disabled 禁用
   */
  properties: {
    defaultValue: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: Infinity,
    },
    width: {
      type: Number,
      value: 35,
    },
    min: {
      type: Number,
      value: 0,
    },
    steps: {
      type: Number,
      value: 1,
    },
    fillable: {
      type: Boolean,
      value: true,
    },
    buttonType: {
      type: String,
      value: 'box',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _cutDisabled: false,
    _addDisabled: false,
    value: 0,
  },

  /**
   * 组件方法列表
   */
  methods: {
    handleInput(e) {
      let value = Number(e.detail.value);
      this.computed(value)
    },
    computed(value) {
      let {
        _cutDisabled,
        _addDisabled,
        max,
        min
      } = this.data;
      if (typeof value !== 'number' || isNaN(value) || value <= min) {
        value = min;
        _cutDisabled = true;
        _addDisabled = false;
      } else if (value >= max) {
        value = max;
        _cutDisabled = false;
        _addDisabled = true;
      } else {
        _cutDisabled = false;
        _addDisabled = false;
      }
      this.setData({
        value,
        _cutDisabled,
        _addDisabled,
      })
    },
    handleBlur(e) {
      const { value } = this.data;
      this.triggerEvent('onChange',{ value },{});
    },
    handleConfirm(e) {
      const { value } = this.data;
      this.triggerEvent('onChange',{ value },{});
    },
    handleCut() {
      let {
        value,
        steps,
        disabled,
      } = this.data;
      if (this.data._cutDisabled || disabled) return false;
      this.computed(value -= steps);
      this.triggerEvent('onChange',{ value },{});
    },
    handleAdd() {
      let {
        value,
        steps,
        disabled,
      } = this.data;
      if (this.data._addDisabled || disabled) return false;
      this.computed(value += steps);
      this.triggerEvent('onChange',{ value },{});
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
      defaultValue,
      min
    } = this.data;
    if(min<0) throw Error('min 必须大于或等于0');
    this.computed(defaultValue)
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