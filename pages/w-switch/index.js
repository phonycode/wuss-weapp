import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    value: false,
  },
  handleChange(e) {
    console.log(e);
    this.setData({ value: e.detail.value });
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);