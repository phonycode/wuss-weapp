/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-05 09:15:49 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-15 16:09:52
 */
import cell from '../common/behavior/cell';
Component({
  externalClasses: ['wuss-class'],
  relations: {
    cell: {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: cell,
      linked() {
        this._setFistCell();
      },
      linkChanged() {
        this._setFistCell();
      },
      unlinked() {
        this._setFistCell();
      },
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    _setFistCell() {
      const cellNodes = this.getRelationNodes('cell');
      cellNodes.forEach((e, i) => {
        e.setData({
          firstCell: i === 0,
        });
      });
    },
  },
});
