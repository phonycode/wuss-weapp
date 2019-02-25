import WussComponent from '../common/extends/baseComponent';
import field from '../common/behavior/field';

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
   * @param {string} mode 时间选择器模式 [date/dateTime/dateTimeMinute/dateTimeHour]
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
   */
  properties: {
    mode: {
      type: String,
      value: 'dateTime'
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
      observer(_v) {
        const { [0]: year, [1]: month, [2]: day, [3]: hours, [4]: minutes, [5]: seconds } = this.data.suffixName;
        let value;
        const type = Object.prototype.toString.call(_v);
        if (type === '[object String]' || type === '[object Number]' || type === '[object Date]') {
          const date = new Date(_v);
          value = [
            `${date.getFullYear()}${year}`,
            `${date.getMonth()+1>10?date.getMonth()+1: `0${date.getMonth()+1}`}${month}`,
            `${date.getDate()>10?date.getDate(): `0${date.getDate()}`}${day}`,
            `${date.getHours()>10?date.getHours(): `0${date.getHours()}`}${hours}`,
            `${date.getMinutes()>10?date.getMinutes(): `0${date.getMinutes()}`}${minutes}`,
            `${date.getSeconds()>10?date.getSeconds(): `0${date.getSeconds()}`}${seconds}`,
          ];
        } else if (type === '[object Array]') {
          value = _v.map((v,index) => {
            if(index === 0) return !(v.indexOf(year) > -1) ? `${v}${year}` : v;
            return !(v.indexOf(this.data.suffixName[index]) > -1) ? `${v}${this.data.suffixName[index]}` : v;
          });
        } else {
          return console.warn('w-date-picker Error: defaultValue 值只能为时间蹉、字符串、date类型、数组等');
        };
        this.setData({
          value,
          _defaultValue: value,
        });
        this.validate(value);
      },
    },
    cancelTextColor: {
      type: String,
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmTextColor: {
      type: String,
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    placeholder: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    options: [],
    value: '',
    _defaultValue: null,
  },

  /**
   * 组件方法列表
   */
  methods: {
    withData(param) {
      return param < 10 ? '0' + param : '' + param;
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
      let {
        options
      } = this.data;
      const days = this.getMonthDay(options[0][value[0]], options[1][value[1]]);
      this.setData({
        [`options[2]`]: days,
      });
    },
    handleSelect(e) {
      const { [0]: year, [1]: month, [2]: day, [3]: hour, [4]: minute, [5]: seconds } = e.detail.value;
      const dateLen = e.detail.value.length;
      let value;
      const { showValue } = this.data;
      const _year = year && year.substr(0,4);
      const MONTH = month && month.substr(0,2);
      const _day = day && day.substr(0,2);
      const _hour = hour && hour.substr(0,2);
      const _minute = minute && minute.substr(0,2);
      const _seconds = seconds && seconds.substr(0,2);
      let _month = new Date(_year, MONTH);
      _month.setMonth(_month.getMonth() - 1);
      _month = _month.getMonth();
      switch (showValue) {
        case 'formateDate': //返回格式化后的时间
          try {
            value = `${_year}-${_month}-${_day}`;
            switch (dateLen) {
              case 6: // yy:mm:dd hh:mm:ss
                value+= ` ${_hour}:${_minute}:${_seconds}`;
                break;
              case 5: // yy:mm:dd hh:mm
                value+= ` ${_hour}:${_minute}`;
                break;
              case 4: // yy:mm:dd hh
                value+= ` ${_hour}`;
                break;
              default:
                break;
            }
          } catch (error) {};
          break;
        case 'timestamp':
          switch (dateLen) {
            case 6: // yy:mm:dd hh:mm:ss
              value = new Date(_year,_month,_day,_hour,_minute,_seconds).getTime();
              break;
            case 5: // yy:mm:dd hh:mm
              value = new Date(_year,_month,_day,_hour,_minute).getTime();
              break;
            case 4: // yy:mm:dd hh
              value = new Date(_year,_month,_day,_hour).getTime();
              break;
            default:
              value = new Date(_year,_month,_day).getTime();
              break;
          }
          break;
        case 'date':
          switch (dateLen) {
            case 6: // yy:mm:dd hh:mm:ss
              value = new Date(_year,_month,_day,_hour,_minute,_seconds);
              break;
            case 5: // yy:mm:dd hh:mm
              value = new Date(_year,_month,_day,_hour,_minute);
              break;
            case 4: // yy:mm:dd hh
              value = new Date(_year,_month,_day,_hour);
              break;
            default:
              value = new Date(_year,_month,_day);
              break;
          }
          break;
        default:
          throw Error('未知mode类型');
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
    const { startDate, endDate, mode } = this.data;
    let dateTimeArray = this.dateTimePicker(startDate, endDate);
    switch (mode) {
      case 'date': // YY:MM:DD
        dateTimeArray = [dateTimeArray[0],dateTimeArray[1],dateTimeArray[2]];
        break;
      case 'dateTime': // YY:MM:DD HH:MM:SS
        break;
      case 'dateTimeMinute': // YY:MM:DD HH:MM
        dateTimeArray = [dateTimeArray[0],dateTimeArray[1],dateTimeArray[2],dateTimeArray[3],dateTimeArray[4]];
        break;
      case 'dateTimeHour': // YY:MM:DD HH
        dateTimeArray = [dateTimeArray[0],dateTimeArray[1],dateTimeArray[2],dateTimeArray[3]];
        break;
      default:
        break;
    };
    this.setData({
      options: dateTimeArray,
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