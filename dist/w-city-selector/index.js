// components/citySelect/index.js
import {
  cities,
  popularCity
} from './city';

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cities: [],
    popularCity: [],
    systemInfo: {},
    searchFocus: false,
    searchVal: '',
    searchResult: [],
  },
  ready: function () {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.cities = storeCity;
    wx.getSystemInfo({
      success: systemInfo => this.setData({systemInfo})
    })
    this.setData({
      cities: this.data.cities,
      popularCity,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      // console.log(event.detail,'click right menu callback data')
    },
    handleSearchFocus() {
      this.setData({
        searchFocus: true,
      })
    },
    handleSearchBlur() {
      
    },    
    handleSearchCity(e) {
      const { value } = e.detail;
      const searchResult = cities.filter(i => (i.label.toLowerCase().indexOf(value.toLowerCase()) > -1))
      this.setData({
        searchResult,
        searchVal: value,
      })
    }, 
    handleSearchCancel() {
      this.setData({
        searchFocus: false,
        searchResult: [],
        searchVal: '',
      })
    },  
  }
})