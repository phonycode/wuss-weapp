import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    popup1: false,
    popup2: false,
    popup3: false,
    popup4: false,
    popup5: false,
    popup6: false,
  },
  handleClose() {
    this.setData({
      popup1: false,
      popup2: false,
      popup3: false,
      popup4: false,
      popup5: false,
      popup6: false,
    });
  },
  handleClick1() {
    this.setData({ popup1: true });
  },
  handleClick2() {
    this.setData({ popup2: true });
  },
  handleClick3() {
    this.setData({ popup3: true });
  },
  handleClick4() {
    this.setData({ popup4: true });
  },
  handleClick5() {
    this.setData({ popup5: true });
  },
  handleClick6() {
    this.setData({ popup6: true });
  },
}
registerShareEvent(pageOptions);

Page(pageOptions);