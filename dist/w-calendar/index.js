import { SFTV } from './data';
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
      type: Number,
      value: 0,
    },
    minDate: {
      type: Number,
      value: 0,
    },
    defaultValue: {
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
    initalMonths: {
      type: Number,
      value: 6,
    },
  },
  data: {
    value: [],
    dateList: [],
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    hashValue: {},
    hashDays: {},
  },
  ready() {
    this.createDateListData();
    this.setDefaultValueToValue();
  },
  methods: {
    //渲染默认日期
    setDefaultValueToValue() {
      let { defaultValue, type } = this.data;
      if (type === 'one') {
        this.onePress(this.searchdDateIndex(defaultValue[0]), true);
      } else if (type === 'range') {
        this.rangePress(this.searchdDateIndex(defaultValue[0]), true);
        this.rangePress(this.searchdDateIndex(defaultValue[1]), true);
      } else if (type === 'more') {
        for (const i of defaultValue) {
          this.morePress(this.searchdDateIndex(i), true);
        }
      }
    },
    //创建月份表
    createDateListData() {
      let { initalMonths, maxDate, minDate } = this.data;
      console.log(new Date(2018, 12, 1).getTime());

      this.createMonthDateList(
        Math.min(
          this.getMonthLen(
            new Date(2018, 12, 1).getTime(),
            new Date().getTime()
          ),
          initalMonths
        ),
        0
      );
    },
    getMonthLen(date1, date2) {
      const year1 = new Date(date1).getFullYear(),
        month1 = new Date(date1).getMonth(),
        year2 = new Date(date2).getFullYear(),
        month2 = new Date(date2).getMonth();
      console.log(year2, year1, month1, month2);

      let len = (year2 - year1) * 12 + month2 - month1;
      return len < 0 ? 1 : len + 1;
    },
    /**
     *
     * @param {number} num 加载几个月
     * @param {number} operator 0代表往后 -1 代表往前
     */
    createMonthDateList(num, operator) {
      console.log(num);

      let { dateList, dateTextObj } = this.data;
      dateTextObj = Object.assign({}, SFTV, dateTextObj);
      let date;
      if (operator) {
        date = dateList[0] || {};
      } else {
        date = dateList[dateList.length - 1] || {};
      }
      const now =
        (date.year && new Date(date.year, date.month + operator)) || new Date();
      const _nowMonth = now.getMonth();
      for (let i = -operator; i < num + -operator; i++) {
        const _createNow = new Date(
          new Date(now.getTime()).setMonth(_nowMonth + (operator ? -i : i))
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
    onePress({ dateIndex, index, year, month, day } = {}, first = false) {
      if (dateIndex === void 666) return false;
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
        () => {
          !first && this.valueChange();
        }
      );
    },
    //多选日期
    morePress({ dateIndex, index, year, month, day } = {}, first = false) {
      if (dateIndex === void 666) return false;
      let { dateList, value } = this.data;
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
        () => {
          !first && this.valueChange();
        }
      );
    },
    //范围日期
    rangePress({ dateIndex, index, year, month, day } = {}, first = false) {
      if (dateIndex === void 666) return false;
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
            !first && this.valueChange();
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
          () => {
            !first && this.valueChange();
          }
        );
      }
    },
    //寻找HashDays的下标
    searchdHashDaysIndex(date) {
      const { dateList } = this.data;
      for (const dateIndex in dateList) {
        for (const index in dateList[dateIndex]['days']) {
          if (dateList[dateIndex]['days'][index] === date)
            return { dateIndex: +dateIndex, index: +index };
        }
      }
    },
    // 寻找时间戳的下标
    searchdDateIndex(date) {
      const { dateList } = this.data;
      const _date = new Date(date);
      const year = _date.getFullYear();
      const month = _date.getMonth() + 1;
      const day = _date.getDate();
      for (const dateIndex in dateList) {
        if (
          year == dateList[dateIndex].year &&
          month == dateList[dateIndex].month
        ) {
          for (const index in dateList[dateIndex]['days']) {
            if (dateList[dateIndex]['days'][index].day == day)
              return { year, month, day, dateIndex: +dateIndex, index: +index };
          }
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
      const {
        dateIndex: dateIndex1,
        index: index1,
      } = this.searchdHashDaysIndex(hashDays[0]);
      const {
        dateIndex: dateIndex2,
        index: index2,
      } = this.searchdHashDaysIndex(hashDays[1]);
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
    },
    // 点击确定
    handleOk() {
      const { value } = this.data;
      this.triggerEvent('onOk', { value });
    },
    // value改变触发
    valueChange() {
      const { value } = this.data;
      this.triggerEvent('onSelect', { value });
    },
    //点击取消
    handleClose() {
      this.triggerEvent('cancel', {}, {});
    },
  },
});
