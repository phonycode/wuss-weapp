import { ActionSheet } from '../../dist/index';
Page({
  data: {
    visible: false,
    items1: [
      {
        text: '分享给朋友',
        type: 'share',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
      },
    ],
    items2: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items3: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items4: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items5: [
      {
        text: '分享给朋友',
        type: 'share',
        icon: 'forward-o',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
        icon: 'share',
      },
    ],
    items6: [
      {
        text: '分享给朋友',
        type: 'share',
      },
      {
        text: '分享到朋友圈',
        type: 'shareTimeLine',
      },
    ],
  },
  handleClick(e) {
    const key = e.currentTarget.dataset.key;
    const item = e.detail;
    if(item.type === 'hide') return ActionSheet.hide({});
    if (key == 6) {
      this.setData(
        {
          [`items${key}[${item.key}].loading`]: true,
        },
        () => {
          setTimeout(() => {
            this.setData({
              [`items${key}[${item.key}].loading`]: false,
              [`visible${key}`]: false,
            });
          }, 2000);
        }
      );
    } else {
      this.setData({
        [`visible${key}`]: false,
      });
    }
  },
  handleClose(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [`visible${key}`]: false });
  },
  handleShow(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [`visible${key}`]: true });
  },
  handleClick2() {
    ActionSheet.show({
      options: [{text: 'ActionSheet.hide()',type: 'hide'}],
    })
  },
});
