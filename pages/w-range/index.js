import { registerShareEvent } from '../../common/share';


const pageOptions = {
  onChange(e) {
    console.log('onChange:  ' + e.detail.value);
  },
  afterChange(e) {
    console.log('afterChange:  ' + e.detail.value);
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);