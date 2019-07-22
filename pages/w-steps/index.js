/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-10 17:52:17 
 * @Last Modified by:   cnyballk[https://github.com/cnyballk] 
 * @Last Modified time: 2018-09-10 17:52:17 
 */
import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    current: 0,
    steps: [
      {
        title: '步骤一',
        desc: '描述一',
      },
      {
        title: '步骤二',
        desc: '描述二',
      },
      {
        title: '步骤三',
        desc: '描述三',
      },
    ],
    steps2: [
      {
        title: '步骤一',
      },
      {
        title: '步骤二',
      },
      {
        title: '步骤三',
        status: 'error',
      },
    ],
  },
  setCurrent() {
    this.setData({
      current: ++this.data.current % 4,
    });
  },
  complete(e) {
    console.log('complete', e.detail.step);
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);