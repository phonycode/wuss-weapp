import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    date1: new Date(new Date().setHours(new Date().getHours() + 2)).getTime(),
  },
  countdownComplate() {
    console.log('倒计时完成');
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);