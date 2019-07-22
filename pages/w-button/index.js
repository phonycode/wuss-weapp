import { registerShareEvent } from '../../common/share';


const pageOptions = {
  change(e) {
    console.log(e)
  }
};


registerShareEvent(pageOptions);

Page(pageOptions);