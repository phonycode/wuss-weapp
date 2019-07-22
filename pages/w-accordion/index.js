import { registerShareEvent } from '../../common/share';

const pageOptions = {
  onChange(e) {
    console.log(e.detail);
  },
  disabledClick(e) {
    console.log(e.detail);
  },
};

registerShareEvent(pageOptions);

Page(pageOptions);
