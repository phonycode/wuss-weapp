/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-05 09:15:49 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-13 18:44:37
 */
const PATH = '../w-cell/index';
Component({
  externalClasses: ['wuss-class'],
  relations: {
    [PATH]: {
      type: 'descendant',
      linked() {
        this._mapLastCell();
      },
      linkChanged() {
        this._mapLastCell();
      },
      unlinked() {
        this._mapLastCell();
      },
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    _mapLastCell() {
      let nodes = this.getRelationNodes(PATH);
      this.setData({ hasBefore: nodes.length >= 1 });
      console.log(nodes);

      nodes.length >= 1 ? nodes[0].updateFistCell() : '';
    },
  },
});
