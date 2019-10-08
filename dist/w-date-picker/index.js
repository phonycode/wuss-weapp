import WussComponent from '../common/extends/baseComponent';
import field from '../common/behavior/field';
import './format';
const fmt = ['Y+,i,year', 'M+,,month', 'd+,i,day', 'h+,i,hours', 'm+,,minutes', 's+,,seconds'];

WussComponent({
  /**
   * 组件间关系定义
   */
  relations: {
    '../w-form/index': {
      type: 'ancestor',
    },
    '../w-validate/index': {
      type: 'ancestor',
    },
  },

  behaviors: [field],

  /**
   * 组件的属性列表
   * @param {stirng} format 要格式化的模板格式 YYYY-MM-DD HH:mm:ss
   * @param {stirng} label 标签名称
   * @param {stirng} title popup弹窗标题
   * @param {stirng} showValue 返回何种格式的时间类型 [formateDate/timestamp/date]
   * @param {number} startDate 开始的年份
   * @param {number} endDate 结束的年份 默认为当前的年份
   * @param {array} suffixName 每个column对应的后缀名称
   * @param {*} defaultValue 设置初始化默认值
   * @param {string} cancelTextColor picker取消文本的字体颜色
   * @param {string} cancelText picker取消文本
   * @param {string} confirmTextColor picker确认文本的字体颜色
   * @param {string} confirmText picker确认文本
   * @param {string} placeholder date picker的占位符文本
   * @param {boolean} maskClosable 点击蒙层是否允许关闭
   */
  properties: {
    format: {
      type: String,
      value: 'YYYY-MM-DD'
    },
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    showValue: {
      type: String,
      value: 'date',
    },
    startDate: {
      type: Number,
      value: 1978
    },
    endDate: {
      type: Number,
      value: new Date().getFullYear(),
    },
    suffixName: {
      type: Array,
      value: ['年','月','日','时','分','秒'],
    },
    defaultValue: {
      type: null,
      observer(value) {
        const { isInitialDefaultValue } = this.data;
        if (!isInitialDefaultValue) { this.getValues(value, true) }
      },
    },
    currentValue: {
      type: null,
      observer(value) {
        const { defaultValue, isInitialDefaultValue } = this.data;
        if (!defaultValue && !isInitialDefaultValue) { // 若defaultValue没有，则默认视为已初始化值.
          this.setData({ isInitialDefaultValue: true }, () => this.getValues(value, false));
          return false;
        };
        if (isInitialDefaultValue) { this.getValues(value, false) }
      },
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    placeholder: String,
    cancelTextColor: String,
    confirmTextColor: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    options: [],
    _formatTpl: [],
    value: '',
    isInitialDefaultValue: false,
    _currentValue: null,
    _defaultValue: null,
  },

  /**
   * 组件方法列表
   */
  methods: {
    withData(param) {
      return (param < 10 ? '0' + param : '' + param) || '00';
    },
    getLoopArray(start = 0, end = 1, dtype) {
      const array = [];
      for (let i = start; i <= end; i++) {
        if (dtype) {
          array.push(this.withData(i) + dtype);
        } else {
          array.push(this.withData(i));
        }
      }
      return array;
    },
    getValues(initialValue, isInitial = false) {
      const { [0]: year, [1]: month, [2]: day, [3]: hours, [4]: minutes, [5]: seconds } = this.data.suffixName;
      let value = [];
      const type = Object.prototype.toString.call(initialValue);
      const { format } = this.data;
      const _formatTpl = [].concat(this.data._formatTpl);
      if (!_formatTpl || !_formatTpl.length) {
        for (let value in fmt) {
          const [regexp, flags, rename] = fmt[value].split(',');
          const validateFlag = new RegExp(`(${regexp})`,flags).test(format);
          if (validateFlag) {
            _formatTpl.push(rename);
          };
        };
      };
      if (type === '[object String]' || type === '[object Number]' || type === '[object Date]') {
        const isTimestamp = !isNaN(Number(initialValue));
        const date = new Date(isTimestamp ? Number(initialValue) : initialValue);
        if (_formatTpl.includes('year')) {
          value[0] = `${date.getFullYear()}${year}`;
        };
        if (_formatTpl.includes('month')) {
          value[1] = `${this.withData(date.getMonth()+1)}${month}`;
        };
        if (_formatTpl.includes('day')) {
          value[2] = `${this.withData(date.getDate())}${day}`;
        };
        if (_formatTpl.includes('hours')) {
          value[3] = `${this.withData(date.getHours())}${hours}`;
        };
        if (_formatTpl.includes('minutes')) {
          value[4] = `${this.withData(date.getMinutes())}${minutes}`;
        };
        if (_formatTpl.includes('seconds')) {
          value[5] = `${this.withData(date.getSeconds())}${seconds}`;
        };
      } else if (type === '[object Array]') { // [’2019年','09月']
        const { _formatTpl, suffixName } = this.data;
        value = initialValue.map((v,index) => {
          if (_formatTpl.includes('year') && index === 0) return v.includes(year) ? v : `${v}${year}`;
          if (_formatTpl.includes('month')) return v.includes(suffixName[1]) ? v : `${v}${suffixName[index]}`;
          if (_formatTpl.includes('day')) return v.includes(suffixName[2]) ? v : `${v}${suffixName[index]}`;
          if (_formatTpl.includes('hours')) return v.includes(suffixName[3]) ? v : `${v}${suffixName[index]}`;
          if (_formatTpl.includes('minutes')) return v.includes(suffixName[4]) ? v : `${v}${suffixName[index]}`;
          if (_formatTpl.includes('seconds')) return v.includes(suffixName[5]) ? v : `${v}${suffixName[index]}`;
        });
      } else {
        throw TypeError('w-date-picker: defaultValue 值只能为时间戳、date字符串、数组等');
      };
      this.setData({
        value,
        ...(isInitial ? { _defaultValue: value, isInitialDefaultValue: true } : { _currentValue: value }),
      });
      this.validate(value);
    },
    getMonthDay(year, month) {
      const { suffixName } = this.data;
      year = year.substr(0, 4);
      month = month.substr(0, 2);
      const flag = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
      let array = [];
      switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
          array = this.getLoopArray(1, 31, suffixName[2])
          break;
        case '04':
        case '06':
        case '09':
        case '11':
          array = this.getLoopArray(1, 30, suffixName[2])
          break;
        case '02':
          array = flag ? this.getLoopArray(1, 29, suffixName[2]) : this.getLoopArray(1, 28, suffixName[2])
          break;
        default:
          array = '月份格式不正确，请重新输入！'
      }
      return array;
    },
    getNewDateArry() {
      // 当前时间的处理
      const { suffixName } = this.data;
      const newDate = new Date();
      const year = this.withData(newDate.getFullYear()) + suffixName[0];
      const mont = this.withData(newDate.getMonth() + 1) + suffixName[1];
      const date = this.withData(newDate.getDate()) + suffixName[2];
      const hour = this.withData(newDate.getHours()); + suffixName[3];
      const minu = this.withData(newDate.getMinutes()); + suffixName[4];
      const seco = this.withData(newDate.getSeconds()) + suffixName[5];
      return [year, mont, date, hour, minu, seco];
    },
    dateTimePicker(start, end) {
      const { suffixName: { [0]: year, [1]: month, [2]: day, [3]: hour, [4]: minute, [5]: seconds }  } = this.data;
      // 返回默认显示的数组和联动数组的声明
      const dateTime = [];
      const dateTimeArray = [
        [],
        [],
        [],
        [],
        [],
        [],
      ];
      // 默认开始显示数据
      const defaultDate = this.getNewDateArry();
      // 处理联动列表数据
      /*年月日 时分秒*/
      dateTimeArray[0] = this.getLoopArray(start, end, year);
      dateTimeArray[1] = this.getLoopArray(1, 12, month);
      dateTimeArray[2] = this.getMonthDay(defaultDate[0], defaultDate[1]);
      dateTimeArray[3] = this.getLoopArray(0, 23, hour);
      dateTimeArray[4] = this.getLoopArray(0, 59, minute);
      dateTimeArray[5] = this.getLoopArray(0, 59, seconds);

      // dateTimeArray.forEach((current, index) => {
      //   dateTime.push(current.indexOf(defaultDate[index]));
      // });

      // return {
      //   dateTimeArray,
      //   dateTime,
      // }
      return dateTimeArray;
    },
    handleChange(e) {
      const value = e.detail.value;
      const { options, _formatTpl } = this.data;
      // 是否包含年月
      if (_formatTpl.includes('year') && _formatTpl.includes('month') && _formatTpl.includes('day')) {
        const days = this.getMonthDay(options[0][value[0]], options[1][value[1]]);
        this.setData({
          [`options[2]`]: days,
        });
      };
    },
    handleSelect(e) {
      let value = [];
      const currentDate = Array.isArray(e.detail.value) ? [].concat(e.detail.value).reverse() : [];
      if (currentDate.length <= 0) return [];
      let { showValue, format } = this.data;
      let _template = ([].concat(this.data._formatTpl)).reverse();

      for (let i = _template.length-1; i >= 0; i--) {
        if (_template.includes('seconds')) {
          value.unshift(currentDate.shift().substr(0, 2));
          _template.shift();
        } else if (_template.includes('minutes')) {
          value.unshift(currentDate.shift().substr(0, 2));
          _template.shift();
        } else if (_template.includes('hours')) {
          value.unshift(currentDate.shift().substr(0, 2));
          _template.shift();
        } else if (_template.includes('day')) {
          value.unshift(currentDate.shift().substr(0, 2));
          _template.shift();
        } else if (_template.includes('month')) {
          let _date = new Date(new Date().getFullYear(),currentDate.shift().substr(0, 2));
          _date.setMonth(_date.getMonth() - 1);
          value.unshift(_date.getMonth().toString());
          _template.shift();
        } else if (_template.includes('year')) {
          value.unshift(currentDate.shift().substr(0, 4));
          _template.shift();
        }
      };

      
      // 处理format模板不包含年月的情况，直接返回新字符串数组值
      if (!this.data._formatTpl.includes('year') && !this.data._formatTpl.includes('month')) {
        const _date = new Date();
        const noIncludesDate = [_date.getFullYear(),_date.getMonth(),_date.getDate()];
        if (this.data._formatTpl.includes('hours')) {
          noIncludesDate.push(value.shift());
        }
        if (this.data._formatTpl.includes('minutes')) {
          noIncludesDate.push(value.shift());
        };
        if (this.data._formatTpl.includes('seconds')) {
          noIncludesDate.push(value.shift());
        };
        value = noIncludesDate;
      }

      switch (showValue) {
        case 'formatDate': //返回格式化后的时间
          value = new Date(...value).format(format);
          break;
        case 'timestamp':
          value = new Date(...value).getTime();
          break;
        case 'date':
          value = new Date(...value);
          break;
        default:
          throw TypeError('w-date-picker: showValue值只能为[formatDate/timestamp/date]');
      };
      this.setData({ value });
      this.triggerEvent('onSelect',{ value },{});
      this.validate(value);
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
    const { startDate, endDate, format } = this.data;
    let { _formatTpl } = this.data;
    const newDateArray = [];
    let [year = [], month = [], day = [], hours = [], minutes = [], seconds = []] = this.dateTimePicker(startDate, endDate);
    const formatTpl = {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    };
    for (let value in fmt) {
      const [regexp, flags, rename] = fmt[value].split(',');
      const validateFlag = new RegExp(`(${regexp})`,flags).test(format);
      if (validateFlag) {
        newDateArray.push(formatTpl[rename]);
        _formatTpl.push(rename);
      };
    };
    this.setData({
      _formatTpl,
      options: newDateArray,
    });
    this.validate();
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