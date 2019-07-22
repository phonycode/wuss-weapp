import { Confirm } from '../../dist/index';

import { registerShareEvent } from '../../common/share';

const pageOptions = {
  handleClick1() {
    Confirm({
      title: '警告',
      content: '你确定要删除吗？',
      confirm: () => { console.log('confirm') },
      cancel: () => { console.log('cancel') },
    })
  },
  handleClick2() {
    Confirm({
      title: '你变了',
      content: '你变绿了',
      cancelTextColor: '#55b2f0',
      confirmTextColor: 'green',
    })
  },
  handleClick3() {
    Confirm({
      title: '提示',
      content: '你爱我吗？',
      cancelText: '忘了爱',
      confirmText: '爱',
      cancelTextColor: '#999',
      confirmTextColor: 'red',
      confirm: () => { console.log('confirm') },
      cancel: () => { console.log('cancel') },
    })
  },
  handleClick4() {
    Confirm({
      title: '提示',
      showCancel: false,
      content: '你只能点确定',
    })
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);

