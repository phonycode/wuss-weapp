/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-05 09:15:49 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-14 10:48:01
 */
const CELL_PATH = '../w-cell/index';
const INPUT_PATH = '../w-input/index';

Component({
  externalClasses: ['wuss-class'],
  relations: {
    [CELL_PATH]: {
      type: 'descendant',
      linked() {
        this._mapLastCell(CELL_PATH);
      },
      linkChanged() {
        this._mapLastCell(CELL_PATH);
      },
      unlinked() {
        this._mapLastCell(CELL_PATH);
      },
    },
    [INPUT_PATH]: {
      type: 'descendant',
      linked() {
        this._mapLastCell(INPUT_PATH);
      },
      linkChanged() {
        this._mapLastCell(INPUT_PATH);
      },
      unlinked() {
        this._mapLastCell(INPUT_PATH);
      },
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    _mapLastCell(path) {
      const nodes = this.getRelationNodes(path);
      nodes.forEach((e, i) => {
        e.setData({
          firstCell: i === 0,
        });
      });
    },
  },
});
