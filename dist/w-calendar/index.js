import { SFTV } from './data';
let DATE_LIST_HASH = {};
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
  externalClasses: ['wuss-class'],
  properties: {
    visible: Boolean,
    maxDate: {
      type: String,
      value: '',
    },
    minDate: {
      type: String,
      value: '',
    },
    value: {
      type: Array,
      value: [],
    },
    startDayText: {
      type: String,
      value: '起',
    },
    endDayText: {
      type: String,
      value: '止',
    },
    dateTextObj: {
      type: Object,
      value: {},
    },
  },
  data: {
    dateList: [],
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
  },
  ready() {
    this.createDateListData();
  },
  methods: {
    handleClose() {
      this.triggerEvent('cancel', {}, {});
    },
    //选择时间段
    selectDataMarkLine() {
      console.log(1);
    },

    //创建月份表
    createDateListData() {
      this.createMonthDateList(6, 0);
    },
    /**
     *
     * @param {number} num 加载几个月
     * @param {number} operator 0代表往后 -1 代表往前
     */
    createMonthDateList(num, operator) {
      let { dateList, dateTextObj } = this.data;
      dateTextObj = Object.assign({}, SFTV, dateTextObj);
      let date;
      if (operator) {
        date = dateList[0] || new Date();
      } else {
        date = dateList[dateList.length - 1] || new Date();
      }
      const now =
        (date.year && new Date(date.year, date.month + operator)) || date;
      const _nowMonth = now.getMonth();
      for (let i = -operator; i < num + -operator; i++) {
        console.log(now);
        const _createNow = new Date(
          now.setMonth(_nowMonth + (operator ? -i : i))
        );
        const year = _createNow.getFullYear();

        const month = _createNow.getMonth() + 1;
        const totalDay = this.getTotalDayByMonth(year, month);
        const week = this.getWeek(year, month, 1);
        const days = [];
        for (let day = -week + 1; day <= totalDay; day++) {
          const tempWeek = this.getWeek(year, month, day);
          let className = '';
          if (tempWeek == 0 || tempWeek == 6) {
            className = 'week';
          }

          days.push({
            day,
            className,
            dateTextObj: dateTextObj[`${month}-${day}`] || false,
          });
        }
        !operator && dateList.push({ year, month, days });
        operator && dateList.unshift({ year, month, days });
      }
      this.setData({ dateList });
    },
    /*
     * 获取月的总天数
     */
    getTotalDayByMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    /*
     * 获取月的第一天是星期几
     */
    getWeek(year, month, day) {
      return day > 0 ? new Date(year, month - 1, day).getDay() : -1;
    },
    /**
     * 点击日期事件
     */
    onPressDate(e) {
      let { dateList } = this.data;
      const { year, month, day, index } = e.currentTarget.dataset;
      console.log(year, month, day, index);
      this.setData(
        {
          [`dateList[${index}].days[${day}].isStartDay`]: true,
        },
        () => {
          console.log(this.data.dateList[index]);
        }
      );
    },
    //渲染选择中的样式
    renderPressStyle(year, month, day) {},
  },
});
