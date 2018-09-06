/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-06 14:22:37 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-06 17:41:20
 */
const PATH = '../w-tabs/index'
Component({
  externalClasses: ['wuss-class'],
  properties: {
    disabled: Boolean,
    title: {
      type: String,
      observer:function() {
        const tabs = this.getRelationNodes(PATH)[0];
        tabs && tabs.setLine();
      },
    },
  },
  relations: {
    [PATH]: {
      type: 'ancestor',
    },
  },
  data: {
    show: false,
    mounted: false,
  },
 
});
