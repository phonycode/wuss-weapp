import { Loading, Alert } from '../../dist/index';
import { registerShareEvent } from '../../common/share';


const pageOptions = {
  handleClick3() {
    Loading.show({
      hide: () => Alert({
        title: '提示',
        content: '我被关闭了',
      }),
    })
    setTimeout(() => {
      Loading.hide()
    }, 3000);
  },
  handleClick1() {
    Loading.show({
      content: 'Loading...',
      hide: () => Alert({
        title: '提示',
        content: '手动调用Hide方法关闭',
      }),
    })
    setTimeout(() => {
      Loading.hide()
    }, 3000);
  },
  handleClick2() {
    Loading.show({
      content: 'Loading...',
      timeout: 2000,
      hide: () => Alert({
        title: '提示',
        content: '设置TimeOut自动关闭',
      }),
    })
  }
}
registerShareEvent(pageOptions);

Page(pageOptions);