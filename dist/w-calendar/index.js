import WussComponent from '../common/extends/baseComponent';
import { SFTV } from './data';

WussComponent({
  /**
   * @param {boolean} visible是 否可见
   * @param {string} type 日历选择类型 'one' | 'more' |'range'
   * @param {string|number} maxDate 最大日期
   * @param {string|number} minDate 最小日期
   * @param {array} defaultValue 最小日期
   * @param {string} startDayText 开始日期的字 type为range有效
   * @param {string} endDayText 结束日期的字 type为range有效
   * @param {object} dateTextObj 日期的文本 比如节日等的渲染
   * @param {number} initalMonths 初始渲染月份
   * @param {object} disabledDate 禁用的日期
   * @param {number} height popup弹出的高度
   */
  properties: {
    visible: Boolean,
    type: {
      type: String,
      value: 'one',
    },
    maxDate: {
      type: null,
      value: 0,
      observer(value) {
        this.isValiDateType(value, 'maxDate');
      },
    },
    minDate: {
      type: null,
      value: 0,
      observer(value) {
        this.isValiDateType(value, 'minDate');
      },
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
    disabledDate: {
      type: Object,
      value: {},
    },
    height: {
      type: Number,
      value: 100,
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmText: {
      type: String,
      value: '确定',
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
    this.prevMonthDateList = [];
    this.nextMonthDateList = [];
    let { maxDate, minDate } = this.data;
    this.maxDateTime = new Date(maxDate).getTime();
    this.minDateTime = new Date(minDate).getTime();
    this.createDateListData();
    this.setDefaultValueToValue();
  },
  methods: {
    //渲染默认日期
    setDefaultValueToValue() {
      let { defaultValue, type } = this.data;
      if (type === 'one') {
        this.onPressDate(this.searchdDateIndex(defaultValue[0]), true);
      } else if (type === 'range') {
        this.onPressDate(this.searchdDateIndex(defaultValue[0]), true);
        this.onPressDate(this.searchdDateIndex(defaultValue[1]), true);
      } else if (type === 'more') {
        for (const i of defaultValue) {
          this.onPressDate(this.searchdDateIndex(i), true);
        }
      }
    },
    isValiDateType(value, name) {
      const type = typeof value;
      if (['number', 'string'].indexOf(type) == -1) {
        throw Error(`${name}类型必须是number或者string而不是${type}`);
      }
    },
    //创建月份表
    createDateListData() {
      let { initalMonths, maxDate } = this.data;
      this.createMonthDateList(
        maxDate !== 0
          ? Math.min(
              this.getMonthLen(new Date().getTime(), maxDate),
              initalMonths
            )
          : initalMonths,
        0
      );
    },
    //获取相差的长度
    getMonthLen(date1, date2) {
      const year1 = new Date(date1).getFullYear(),
        month1 = new Date(date1).getMonth(),
        year2 = new Date(date2).getFullYear(),
        month2 = new Date(date2).getMonth();
      let len = (year2 - year1) * 12 + month2 - month1;
      return len < 0 ? 1 : len + 1;
    },
    /**
     * 创建月份表
     * @param {number} num 加载几个月
     * @param {number} operator 0代表往后 -1 代表往前
     */
    createMonthDateList(num, operator) {
      let { dateList, dateTextObj, disabledDate, maxDate, minDate } = this.data;

      dateTextObj = Object.assign({}, SFTV, dateTextObj);
      const date =
        (operator ? dateList[0] : dateList[dateList.length - 1]) || {};
      const now =
        (date.year && new Date(date.year, date.month + operator)) || new Date();
      now.setDate(1);
      const _nowMonth = now.getMonth();
      let _cntDown = false;
      let _cntTop = false;
      for (let i = -operator; i < num + -operator; i++) {
        const _createNow = new Date(now.getTime());
        _createNow.setMonth(_nowMonth + (operator ? -i : i));

        const year = _createNow.getFullYear();
        const month = _createNow.getMonth() + 1;
        const totalDay = this.getTotalDayByMonth(year, month);
        const week = this.getWeek(year, month, 1);
        const days = [];
        for (let day = -week + 1; day <= totalDay; day++) {
          let className = '';
          let disabled = false;
          const nowDateTime = new Date(year, month - 1, day).getTime();
          if (
            !this._cntDown &&
            day > 0 &&
            maxDate !== 0 &&
            nowDateTime > this.maxDateTime
          ) {
            disabled = true;
            _cntDown = true;
          }
          if (
            !this._cntTop &&
            day > 0 &&
            minDate !== 0 &&
            nowDateTime < this.minDateTime
          ) {
            disabled = true;
            _cntTop = true;
          }
          if (!disabled) {
            const tempWeek = this.getWeek(year, month, day);
            if (tempWeek == 0 || tempWeek == 6) {
              className = 'week';
            }
          }
          days.push({
            day,
            className,
            dateTextObj: dateTextObj[`${month}-${day}`] || false,
            disabledDate: disabledDate[`${year}-${month}-${day}`] || disabled,
          });
        }
        !operator && dateList.push({ year, month, days });
        operator && dateList.unshift({ year, month, days });
      }
      this._cntDown = _cntDown;
      this._cntTop = _cntTop;
      this.setData({ dateList });
      this.createHashMonthDateList(1, -1);
      this.createHashMonthDateList(1, 0);
    },
    /**
     * 创建缓存的月
     */
    createHashMonthDateList(num, operator) {
      let { dateList, dateTextObj, disabledDate, maxDate, minDate } = this.data;
      let prevOrNext = operator
        ? this.prevMonthDateList
        : this.nextMonthDateList;
      dateTextObj = Object.assign({}, SFTV, dateTextObj);
      const date =
        (operator ? dateList[0] : dateList[dateList.length - 1]) || {};
      const now =
        (date.year && new Date(date.year, date.month + operator)) || new Date();
      now.setDate(1);
      const _nowMonth = now.getMonth();
      let _cntDown = false;
      let _cntTop = false;
      for (let i = -operator; i < num + -operator; i++) {
        const _createNow = new Date(now.getTime());
        _createNow.setMonth(_nowMonth + (operator ? -i : i));

        const year = _createNow.getFullYear();
        const month = _createNow.getMonth() + 1;
        const totalDay = this.getTotalDayByMonth(year, month);
        const week = this.getWeek(year, month, 1);
        const days = [];
        for (let day = -week + 1; day <= totalDay; day++) {
          let className = '';
          let disabled = false;
          const nowDateTime = new Date(year, month - 1, day).getTime();
          if (
            !this._cntDown &&
            day > 0 &&
            maxDate !== 0 &&
            nowDateTime > this.maxDateTime
          ) {
            disabled = true;
            _cntDown = true;
          }
          if (
            !this._cntTop &&
            day > 0 &&
            minDate !== 0 &&
            nowDateTime < this.minDateTime
          ) {
            disabled = true;
            _cntTop = true;
          }
          if (!disabled) {
            const tempWeek = this.getWeek(year, month, day);
            if (tempWeek == 0 || tempWeek == 6) {
              className = 'week';
            }
          }
          days.push({
            day,
            className,
            dateTextObj: dateTextObj[`${month}-${day}`] || false,
            disabledDate: disabledDate[`${year}-${month}-${day}`] || disabled,
          });
        }
        !operator && prevOrNext.push({ year, month, days });
        operator && prevOrNext.unshift({ year, month, days });
      }
      this._cntDown = _cntDown;
      this._cntTop = _cntTop;
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
    onPressDate(e, first = false) {
      const { dateIndex, index, day, ...dataset } =
        (e.currentTarget && e.currentTarget.dataset) || e;

      if (
        dateIndex === void 666 ||
        day <= 0 ||
        this.data.dateList[dateIndex]['days'][index].disabledDate
      )
        return false;
      this[this.data.type + 'Press'](
        { ...dataset, index, dateIndex, day },
        first
      );
    },
    //单选日期
    onePress({ dateIndex, index, year, month, day }, first = false) {
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
    morePress({ dateIndex, index, year, month, day }, first = false) {
      let { dateList, value, hashValue } = this.data;
      const { checked } = dateList[dateIndex].days[index];
      let nowHash =  hashValue[`${year}-${month}-${day}`];
      if (checked) {
        // 替代方案
        value.splice(nowHash, 1);
        for (const key in hashValue) {
          if(hashValue[key] > nowHash) hashValue[key] = hashValue[key] -1;
        }
        delete hashValue[`${year}-${month}-${day}`];
        // 问题代码
        // value.splice(hashValue[`${year}-${month}-${day}`], 1);
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
    rangePress({ dateIndex, index, year, month, day }, first = false) {
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
        date2 = new Date(year, month - 1, day);
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
            value: [new Date(year, month - 1, day)],
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
      try {
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
                return {
                  year,
                  month,
                  day,
                  dateIndex: +dateIndex,
                  index: +index,
                };
            }
          }
        }
      } catch (e) {
        return {};
      }
      return {};
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
    //到底顶部
    handleScrollToUpper(e) {
      this.top = true;
      if (this.top && !this._cntTop) {
        this.hashDateListToDateList(-1);
        this.top = false;
      }
    },
    //到底底部
    handleScrollToLower() {
      this.end = true;
      if (this.end && !this._cntDown) {
        this.hashDateListToDateList(0);
        this.end = false;
      }
    },
    handleTouchStart() {
      this.top = false;
      this.end = false;
    },
    //使用缓存
    hashDateListToDateList(operator) {
      let { dateList } = this.data;
      if (operator) {
        //前
        dateList.unshift(this.prevMonthDateList.shift());
        this.createHashMonthDateList(1, -1);
      } else {
        //后
        dateList.push(this.nextMonthDateList.pop());
        this.createHashMonthDateList(1, 0);
      }
      this.setData({ dateList });
    },
    // 点击确定
    handleOk() {
      const { value } = this.data;
      this.setData({
        visible: false,
      });
      this.triggerEvent('onConfirm', { value });
    },
    // value改变触发
    valueChange() {
      const { value } = this.data;
      this.triggerEvent('onSelect', { value });
    },
    //点击取消
    handleClose() {
      this.setData({
        visible: false,
      });
      this.triggerEvent('onCancel', {}, {});
    },
  },
});
