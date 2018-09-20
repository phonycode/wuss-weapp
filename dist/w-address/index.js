/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-15 09:20:34 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2018-09-19 17:47:35
 */
import Behavior from '../common/behavior/index';
import field from '../common/behavior/field';
import CHINA_ADDRESS from '../common/data/china_address';

const NO_MORE_ITEM = [{
  key: '-',
  value: '-'
}];

Component({
  behaviors: [Behavior, field],
  externalClasses: ['wuss-class'],
  relations: {
    '../w-form/index': {
      type: 'ancestor',
    },
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   * @param {string} visible  组件是否可见
   * @param {string} disabled 禁用
   * @param {string} value  form表单收集的值
   * @param {string} province  双向绑定当前省市区
   * @param {string} city  双向绑定当前市
   * @param {string} area  双向绑定当前区
   * @param {string} defaultValue  双向绑定当前省市区 {province : xxx, city: xxx, area:xxx }
   * @param {string} title  header中间的标题
   * @param {string} cancelText 取消按钮的文本
   * @param {string} confirmText  确定按钮的文本
   * @param {string} confirmTextColor 确定按钮的颜色
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: String,
      value: {},
    },
    province: {
      type: String,
      value: '',
    },
    city: {
      type: String,
      value: '',
    },
    area: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    confirmTextColor: {
      type: String,
      value: '#ff8800',
    },
  },
  data: {
    value: ['','',''],
    _province_Data: [],
    _city_Data: [],
    _area_Data: [],
    _pickerWidth: '',
  },
  methods: {
    _confirm() {
      const province_picker = this.selectComponent('#wuss-picker-province');
      const city_picker = this.selectComponent('#wuss-picker-city');
      const area_picker = this.selectComponent('#wuss-picker-area');
      const value = [province_picker.data.currentItem.name,city_picker.data.currentItem.name,area_picker.data.currentItem.name];
      this.setData({ value },() => {
        this.triggerEvent('onSelect',{ value },{});
        this.triggerEvent('onCancel',{},{});
      })
    },
    _handleCancel() {
      this.triggerEvent('onCancel',{},{});
    },
    _changeProvince(e) {
      const {
        visible
      } = this.data;
      const {
        currentItem
      } = e.detail;
      // console.log(currentItem)
      const cityData = CHINA_ADDRESS[currentItem.key];
      if (typeof cityData.child === 'object' && Object.keys(cityData.child).length > 0) {
        const currentCity = [];
        Object.keys(cityData.child).forEach(item => {
          currentCity.push({
            name: cityData.child[item].name,
            key: item,
            parent: currentItem.key,
          });
        })
        this.setData({
          _city_Data: currentCity,
        })
      }
    },
    _changeCity(e) {
      const {
        visible
      } = this.data;
      const {
        currentItem
      } = e.detail;
      const areaData = CHINA_ADDRESS[currentItem.parent].child[currentItem.key];
      if (typeof areaData.child === 'object' && Object.keys(areaData.child).length > 0) {
        const currentCity = [];
        Object.keys(areaData.child).forEach(item => {
          currentCity.push({
            name: areaData.child[item],
            key: item,
          });
        })
        this.setData({
          _area_Data: currentCity,
        })
        // console.log(currentItem, currentCity)
      }
    },
    _initalAddress() {
      const province = [];
      const city = [];
      const area = [];
      Object.keys(CHINA_ADDRESS).forEach(item => {
        province.push({
          name: CHINA_ADDRESS[item].name,
          key: item,
        });
      })
      // console.log(province)
      this.setData({
        _province_Data: province,
      })
    },
  },
  ready() {
    // console.log(CHINA_ADDRESS)
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      _pickerWidth: systemInfo.windowWidth / 3,
    });
    this._initalAddress();
  },
})