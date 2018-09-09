Component({
  externalClasses: ['wuss-class'],
  optiton: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * Array<{title:string,desc:string,status:'wait'|'finish'|'error'|'process'}>
   * @param {array} steps 步骤数组
   * @param {string} direction 横向和竖向 'vertical' | 'horizontal'
   * @param {number} current 指定当前步骤，从 0 开始记数。
   */
  properties: {
    steps: {
      type: Array,
      observer: 'setStatus',
    },
    direction: {
      type: String,
      value: 'horizontal',
    },
    current: {
      type: Number,
      observer(newValue) {
        const { steps } = this.data;
        const l = steps.length;
        if (newValue >= l) {
          this.triggerEvent('complete', {
            step: steps[l - 1],
          });
        }
        this.setStatus();
      },
    },
  },
  methods: {
    setStatus() {
      const { steps } = this.data;
      steps.forEach((step, index) => {
        const status = step.status || this.getStatus(index);
        step._status = status;
        index && (steps[index - 1]._lineStatus = status);
      });
      this.setData({ steps });
    },

    getStatus(index) {
      const { current } = this.data;

      if (index < current) {
        return 'finish';
      } else if (index === current) {
        return 'process';
      }

      return 'wait';
    },
  },
});
