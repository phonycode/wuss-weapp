/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-05 09:15:49 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:48:38
 */
import WussComponent from '../common/extends/baseComponent';
import cell from '../common/behavior/cell';

WussComponent({
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
