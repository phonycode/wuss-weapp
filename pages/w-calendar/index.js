/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei]
 * @Date: 2018-09-01 13:25:28
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-12-01 09:59:19
 */
const now = new Date();
import { registerShareEvent } from '../../common/share';
const pageOptions = {
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    defaultValue: [now.getTime(), '2018-12-1'],
    maxDate: new Date().setMonth(now.getMonth() + 3),
    minDate: now.getTime(),
    disabledDate: {
      '2018-12-29': {
        text: '禁用',
      },
      '2018-12-30': {
        text: '你点不到我',
      },
      '2018-12-31': {
        text: '禁用',
      },
    },
  },
  handleClick1() {
    this.setData({ visible1: !this.data.visible1 });
  },
  handleClick2() {
    this.setData({ visible2: !this.data.visible2 });
  },
  handleClick3() {
    this.setData({ visible3: !this.data.visible3 });
  },
  handleCancel() {
    console.log('cancel');
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
    });
  },
  handleSelected(date) {
    const {
      detail: { value },
    } = date;
    console.log(value);
  },
  handleConfirm(date) {
    const {
      detail: { value },
    } = date;
    console.log(value);
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
    });
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);

