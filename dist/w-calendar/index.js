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
    type: {
      type: String,
      value: 'range', //'one' | 'more' |'range'
    },
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
    hashValue: {},
    hashDays: {},
  },
  ready() {
    this.createDateListData();
  },
  methods: {
    handleClose() {
      this.triggerEvent('cancel', {}, {});
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
      let { type } = this.data;
      const { day, ...dataset } = e.currentTarget.dataset;
      if (day <= 0) return false;
      this[type + 'Press']({ ...dataset, day });
    },
    //单选日期
    onePress({ dateIndex, index, year, month, day }) {
      const { dateList, hashDays } = this.data;
      const newDay = dateList[dateIndex]['days'][index];
      if (hashDays[0] === newDay) return false;
      hashDays[0] && (hashDays[0].checked = false);
      newDay.checked = true;
      this.setData(
        {
          dateList,
          value: [new Date(year, month - 1, day)],
          hashDays: [newDay],
        },
        this.valueChange
      );
    },
    //多选日期
    morePress({ dateIndex, index, year, month, day }) {
      let { dateList, value, hashValue } = this.data;
      const { checked } = dateList[dateIndex].days[index];
      if (checked) {
        value.splice(hashValue[`${year}-${month}-${day}`], 1);
      } else {
        value.push(new Date(year, month - 1, day));
      }
      this.setData(
        {
          [`dateList[${dateIndex}].days[${index}].checked`]: !checked,
          value,
          hashValue: {
            ...hashValue,
            [`${year}-${month}-${day}`]: value.length - 1,
          },
        },
        this.valueChange
      );
    },
    //范围日期
    rangePress({ dateIndex, index, year, month, day }) {
      let {
        startDayText,
        dateList,
        endDayText,
        value: [date1, date2],
        hashDays,
      } = this.data;
      this.clearRangeStyle();
      const newDay = dateList[dateIndex]['days'][index];
      if (date1 && !date2) {
        date2 = new Date(year, month + 1, day);
        if (date1.getTime() === date2.getTime()) {
          endDayText = startDayText + endDayText;
        }
        if (date1.getTime() > date2.getTime()) {
          [date1, date2] = [date2, date1];
          hashDays[1] = hashDays[0];
          hashDays[0] = newDay;
        } else {
          hashDays[1] = newDay;
        }

        hashDays[0].checked = true;
        hashDays[0].checkedText = startDayText;
        hashDays[1].checked = true;
        hashDays[1].checkedText = endDayText;
        this.setData(
          {
            dateList,
            value: [date1, date2],
            hashDays,
          },
          () => {
            this.renderRangeStyle({ dateIndex, index });
          }
        );
      } else {
        if (hashDays[0]) {
          hashDays[0].checked = false;
          hashDays[0].checkedText = '';
        }
        if (hashDays[1]) {
          hashDays[1].checked = false;
          hashDays[1].checkedText = '';
        }
        newDay.checked = true;
        newDay.checkedText = startDayText;
        this.setData(
          {
            dateList,
            value: [new Date(year, month + 1, day)],
            hashDays: [newDay],
          },
          this.valueChange
        );
      }
    },
    searchdDateIndex(date) {
      const { dateList } = this.data;
      for (const dateIndex in dateList) {
        for (const index in dateList[dateIndex]['days']) {
          if (dateList[dateIndex]['days'][index] === date)
            return { dateIndex: +dateIndex, index: +index };
        }
      }
    },
    clearRangeStyle() {
      this.renderHash = this.renderHash || [];
      this.renderHash.forEach(element => {
        element.renderRange = false;
      });
      this.setData({
        dateList: this.data.dateList,
      });
    },
    //渲染选择中的范围的样式
    renderRangeStyle() {
      const { dateList, hashDays } = this.data;
      const { dateIndex: dateIndex1, index: index1 } = this.searchdDateIndex(
        hashDays[0]
      );
      const { dateIndex: dateIndex2, index: index2 } = this.searchdDateIndex(
        hashDays[1]
      );
      this.renderHash = [];
      for (let i = dateIndex1; i <= dateIndex2; i++) {
        for (
          let ii = i === dateIndex1 ? index1 : 0,
            l = i === dateIndex2 ? index2 : dateList[i].days.length;
          ii < l;
          ii++
        ) {
          dateList[i].days[ii].renderRange = true;
          this.renderHash.push(dateList[i].days[ii]);
        }
      }
      this.setData({ dateList });
      this.valueChange();
    },
    handleOk() {
      const { value } = this.data;
      this.triggerEvent('onOk', { value });
    },
    valueChange() {
      const { value } = this.data;
      this.triggerEvent('onSelect', { value });
    },
  },
});
