const PATH = '../w-accordion/index';
Component({
  externalClasses: ['wuss-class'],
  options: {
    addGlobalClass: true,
  },
  relations: {
    [PATH]: {
      type: 'child',
      linked() {
        this.update();
      },
      linkChanged() {
        this.update();
      },
      unlinked() {
        this.update();
      },
    },
  },
  /**
   * @param {accordion} 开启手风琴模式
   * @param {activeKey} 激活的key数组
   */
  properties: {
    accordion: Boolean,
    activeKey: {
      type: Array,
      value: [],
      observer: 'changeCurrent',
    },
  },
  data: {
    keys: [],
  },
  methods: {
    update() {
      const { activeKey, accordion } = this.data;
      const keys = this.getRelationNodes(PATH).map((e, index) => {
        const current = accordion
          ? activeKey[0] === index
          : activeKey.indexOf(index) !== -1;
        e.setData({ current, index });
        return e.data.key;
      });
      this.setData({ keys });
    },
    clickDisabledItem(index, key) {
      this.triggerEvent('disabledClick', { index, key });
    },
    clickItem(index) {
      let { activeKey, accordion, keys } = this.data;
      if (accordion) {
        activeKey = activeKey[0] === index ? [] : [index];
      } else {
        activeKey =
          activeKey.indexOf(index) !== -1
            ? activeKey.filter(n => n !== index)
            : [...activeKey, index];
      }
      this.setData({ activeKey }, () => {
        this.update();
        this.triggerEvent('onChange', {
          activeKey,
          keys: keys.filter((e, i) => {
            return activeKey.indexOf(i) !== -1;
          }),
        });
      });
    },
  },
});
