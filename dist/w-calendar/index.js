import Moment from './moment';
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();

/**
 * 预定日期日历选择器
 * @augments {date} checkInDate 当前选择日期的起始时间
 * @augments {date} checkOutDate 当前选择日期的起始时间
 * @augments {number} maxMonth 最大渲染月数
 */
Component({
  /**
   * 继承父组件的class
   */
  externalClasses: ['wuss-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    checkInDate: {
      type: Date,
      value: '',
    },
    checkOutDate: {
      type: Date,
      value: '',
    },
    maxMonth: {
      type: Number,
      value: 6,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateList: [],
    systemInfo: {},
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    markcheckInDate: false, //标记开始时间是否已经选择
    markcheckOutDate: false, //标记结束时间是否已经选择
    sFtv: [{
        month: 1,
        day: 1,
        name: "元旦"
      },
      {
        month: 2,
        day: 14,
        name: "情人节"
      },
      {
        month: 3,
        day: 8,
        name: "妇女节"
      },
      {
        month: 3,
        day: 12,
        name: "植树节"
      },
      {
        month: 3,
        day: 15,
        name: "消费者权益日"
      },
      {
        month: 4,
        day: 1,
        name: "愚人节"
      },
      {
        month: 4,
        day: 5,
        name: "清明节"
      },
      {
        month: 4,
        day: 6,
        name: "休"
      },
      {
        month: 4,
        day: 7,
        name: "休"
      },
      {
        month: 4,
        day: 29,
        name: "休"
      },
      {
        month: 4,
        day: 30,
        name: "休"
      },
      {
        month: 5,
        day: 1,
        name: "劳动节"
      },
      {
        month: 5,
        day: 4,
        name: "青年节"
      },
      {
        month: 5,
        day: 12,
        name: "护士节"
      },
      {
        month: 6,
        day: 1,
        name: "儿童节"
      },
      {
        month: 7,
        day: 1,
        name: "建党节"
      },
      {
        month: 8,
        day: 1,
        name: "建军节"
      },
      {
        month: 9,
        day: 10,
        name: "教师节"
      },
      {
        month: 9,
        day: 28,
        name: "孔子诞辰"
      },
      {
        month: 10,
        day: 1,
        name: "国庆节"
      },
      {
        month: 10,
        day: 2,
        name: "休"
      },
      {
        month: 10,
        day: 3,
        name: "休"
      },
      {
        month: 10,
        day: 4,
        name: "休"
      },
      {
        month: 10,
        day: 5,
        name: "休"
      },
      {
        month: 10,
        day: 6,
        name: "休"
      },
      {
        month: 10,
        day: 7,
        name: "休"
      },
      {
        month: 10,
        day: 24,
        name: "联合国日"
      },
      {
        month: 12,
        day: 24,
        name: "平安夜"
      },
      {
        month: 12,
        day: 25,
        name: "圣诞节"
      }
    ]
  },
  ready: function () { // 页面初始化 properties为页面跳转所带来的参数
    const {
      checkInDate,
      checkOutDate
    } = this.data;
    this.createDateListData();
    wx.getSystemInfo({
      success: systemInfo => this.setData({
        systemInfo
      })
    })
    if (checkInDate && checkOutDate) {
      this.setData({
        markcheckInDate: true,
        markcheckOutDate: true,
      })
      this.selectDataMarkLine()
    } else {
      this.setData({
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
      })
    }
  },
  attached: function () {},
  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('cancel', {}, {})
    },
    //选择的入住与离店时间段
    selectDataMarkLine: function () {
      let dateList = this.data.dateList;
      const {
        checkInDate,
        checkOutDate
      } = this.data;
      let curreInid = checkInDate.substr(0, 4) + "-" + (checkInDate.substr(5, 2) < 10 ? checkInDate.substr(6, 1) : checkInDate.substr(5, 2)); //选择入住的id
      let curreOutid = checkOutDate.substr(0, 4) + "-" + (checkOutDate.substr(5, 2) < 10 ? checkOutDate.substr(6, 1) : checkOutDate.substr(5, 2)); //选择离店的id
      let yearIn = checkInDate.substr(0, 4);
      let yearOut = checkOutDate.substr(0, 4);
      let dayIn = checkInDate.substr(8, 2) >= 10 ? checkInDate.substr(8, 2) : checkInDate.substr(9, 1); //选择入住的天id
      let dayOut = checkOutDate.substr(8, 2) >= 10 ? checkOutDate.substr(8, 2) : checkOutDate.substr(9, 1); //选择离店的天id
      let monthIn = checkInDate.substr(5, 2) >= 10 ? checkInDate.substr(5, 2) : checkInDate.substr(6, 1); //选择入店的月id
      let monthOut = checkOutDate.substr(5, 2) >= 10 ? checkOutDate.substr(5, 2) : checkOutDate.substr(6, 1); //选择离店的月id
      if (curreInid == curreOutid) { //入住与离店是当月的情况
        for (let i = 0; i < dateList.length; i++) {
          if (dateList[i].id == curreInid) {
            let days = dateList[i].days;
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn && days[k].day <= dayOut) {
                days[k].class = days[k].class + ' bgitem';
              }
              if (days[k].day == dayIn) {
                days[k].class = days[k].class + ' active';
                days[k].inday = true;
              }
              if (days[k].day == dayOut) {
                days[k].class = days[k].class + ' active';
                days[k].outday = true;
              }
            }
          }
        }
      } else { //跨月
        for (let j = 0; j < dateList.length; j++) {
          if (dateList[j].month == monthIn) { //入住的开始月份
            let days = dateList[j].days;
            for (let k = 0; k < days.length; k++) {
              if (days[k].day >= dayIn) {
                days[k].class = days[k].class + ' bgitem';
              }
              if (days[k].day == dayIn) {
                days[k].class = days[k].class + ' active';
                days[k].inday = true;
              }
            }
          } else { //入住跨月月份
            if (yearOut <= yearIn) {
              if (dateList[j].month < monthOut && dateList[j].month > monthIn) { //离店中间的月份
                let days = dateList[j].days;
                for (let k = 0; k < days.length; k++) {
                  days[k].class = days[k].class + ' bgitem';
                }
              } else if (dateList[j].month == monthOut) { //离店最后的月份
                let days = dateList[j].days;
                for (let k = 0; k < days.length; k++) {
                  if (days[k].day <= dayOut) {
                    days[k].class = days[k].class + ' bgitem';
                  }
                  if (days[k].day == dayOut) {
                    days[k].class = days[k].class + ' active';
                    days[k].outday = true;
                  }
                }
              }
            } else if (yearOut > yearIn) { // 跨年的话
              let days = dateList[j].days;
              if (dateList[j].year == yearIn) { // 当年的跨月
                if (dateList[j].month > monthIn) { //离店中间的月份
                  let days = dateList[j].days;
                  for (let k = 0; k < days.length; k++) {
                    days[k].class = days[k].class + ' bgitem';
                  }
                }
              } else { // 下一年的跨月
                for (let k = 0; k < days.length; k++) {
                  if (days[k].day < dayOut) {
                    days[k].class = days[k].class + ' bgitem';
                  }
                }
              }
            } else {}
          }
        }
      }
      this.setData({
        dateList: dateList
      })
    },
    createDateListData: function () {
      var dateList = [];
      var now = new Date();
      /*
        设置日期为 年-月-01,否则可能会出现跨月的问题
        比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
          原因是由于2月份没有31号，顺推下去变成了了03-03
      */
      now = new Date(now.getFullYear(), now.getMonth(), 1);
      for (var i = 0; i < this.data.maxMonth; i++) {
        var momentDate = Moment(now).add(this.data.maxMonth - (this.data.maxMonth - i), 'month').date;
        var year = momentDate.getFullYear();
        var month = momentDate.getMonth() + 1;

        var days = [];
        var totalDay = this.getTotalDayByMonth(year, month);
        var week = this.getWeek(year, month, 1);
        //-week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，
        //则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
        for (var j = -week + 1; j <= totalDay; j++) {
          var tempWeek = -1;
          if (j > 0)
            tempWeek = this.getWeek(year, month, j);
          var clazz = '';
          if (tempWeek == 0 || tempWeek == 6)
            clazz = 'week'
          if (j < DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
            //当天之前的日期不可用
            clazz = 'unavailable ' + clazz;
          else
            clazz = '' + clazz
          days.push({
            day: j,
            class: clazz
          })
        }
        var dateItem = {
          id: year + '-' + month,
          year: year,
          month: month,
          days: days
        }

        dateList.push(dateItem);
      }
      var sFtv = this.data.sFtv;
      for (let i = 0; i < dateList.length; i++) { //加入公历节日
        for (let k = 0; k < sFtv.length; k++) {
          if (dateList[i].month == sFtv[k].month) {
            let days = dateList[i].days;
            for (let j = 0; j < days.length; j++) {
              if (days[j].day == sFtv[k].day) {
                sFtv[k].name === '休' ? days[j].class += ' vacation' : '';
                days[j].daytext = sFtv[k].name
              }
            }
          }
        }
      }
      this.setData({
        dateList: dateList
      });
      DATE_LIST = dateList;
    },

    /*
     * 获取月的总天数
     */
    getTotalDayByMonth: function (year, month) {
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    /*
     * 获取月的第一天是星期几
     */
    getWeek: function (year, month, day) {
      var d = new Date(year, month - 1, day);
      return d.getDay();
    },
    /**
     * 点击日期事件
     */
    onPressDate: function (e) {
      var {
        year,
        month,
        day
      } = e.currentTarget.dataset;
      //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
      if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0) return;

      var tempMonth = month;
      var tempDay = day;

      if (month < 10) tempMonth = '0' + month
      if (day < 10) tempDay = '0' + day

      var date = year + '-' + tempMonth + '-' + tempDay;
      //如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
      if ((this.data.markcheckInDate && Moment(date).before(this.data.checkInDate) || this.data.checkInDate === date)) {
        this.setData({
          markcheckInDate: false,
          markcheckOutDate: false,
          dateList: DATE_LIST.concat()
        });
        this.createDateListData();
      };
      if (this.data.markcheckInDate && this.data.markcheckOutDate) {
        this.createDateListData();
        this.setData({
          checkInDate: date,
          markcheckInDate: false,
          markcheckOutDate: false,
        })
      }

      if (!this.data.markcheckInDate) {
        this.setData({
          checkInDate: date,
          markcheckInDate: true,
          dateList: DATE_LIST.concat()
        });
        wx.showToast({
          title: '请选择离店日期',
          icon: 'none',
          duration: 1500,
        });
      } else if (!this.data.markcheckOutDate) {
        this.setData({
          checkOutDate: date,
          markcheckOutDate: true,
        });
        //设缓存，返回页面时，可在onShow时获取缓存起来的日期
        // wx.setStorage({
        //   key: 'ROOM_SOURCE_DATE',
        //   data: {
        //     checkInDate: this.data.checkInDate,
        //     checkOutDate: this.data.checkOutDate
        //   }
        // });
        this.selectDataMarkLine()
        // this.createDateListData();
        setTimeout(() => {
          const {
            checkInDate,
            checkOutDate
          } = this.data;
          let checkTotalDay = Moment(checkOutDate).differ(checkInDate);
          this.triggerEvent('onSelect', {
            checkInDate,
            checkOutDate,
            checkTotalDay,
          }, {})
          this.triggerEvent('cancel', {}, {} )
        }, 300);
      }

      this.renderPressStyle(year, month, day);
    },
    renderPressStyle: function (year, month, day) {
      var dateList = this.data.dateList;
      //渲染点击样式
      for (var i = 0; i < dateList.length; i++) {
        var dateItem = dateList[i];
        var id = dateItem.id;
        if (id === year + '-' + month) {
          var days = dateItem.days;
          for (var j = 0; j < days.length; j++) {
            var tempDay = days[j].day;
            if (tempDay == day) {
              days[j].class = days[j].class + ' active';
              // days[j].inday = true;
              break;
            }
          }
          break;
        }
      }
      this.setData({
        dateList: dateList
      });
    }
  }
})