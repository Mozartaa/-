//index.js
import utils from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    searchValue: '',
    hotwords: []
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
  onLoad: async function(options) {
    const that = this
    await utils.requestPromise('GET', '/getHotWords', {
      size: 10,
    }).then(res => {
      console.log('加载热词', res.data)
      that.setData({
        hotwords: res.data
      })
    })
  }

})