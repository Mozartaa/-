//index.js
import utils from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    searchValue: '',
    hotwords: [{
      name: "3D打印"
    }, {
      name: "人工智能"
    }, {
      name: "大数据"
    }, {
      name: "纳米材料"
    }, {
      name: "太阳能电池"
    }, {
      name: "新能源"
    }, {
      name: "神经调节芯片"
    }, {
      name: "等离子体"
    }, {
      name: "数学模型"
    }, {
      name: "管理"
    }],
  },
  search: function(e) {
    console.log(e)
  },
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  bindSearch: function() {
    wx.showLoading({
      title: '搜索中',
    })

    wx.navigateTo({
      url: '../index-search/index-search?searchValue=' + this.data.searchValue || '',
      success: (res) => {
        wx.hideLoading()
      }
    })
  },
  onLoad: async(options) => {
    await utils.requestPromise('GET', '/getHotWords', {
      size: 10,
    })
  }

})