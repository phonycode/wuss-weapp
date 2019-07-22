import { registerShareEvent } from '../../common/share';


const pageOptions = {
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
  },
  handleClick(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      [`visible${id}`]: true,
    });
  },
  handleClose() {
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    });
  },
  onLoad() {
    setTimeout(() => this.setData({ visible1: true }), 1000);
  }
};


registerShareEvent(pageOptions);

Page(pageOptions);
