// 获取应用实例
var app = getApp();
import utils from '../../utils/util.js'
Page({
  // 需要用到的数据
  data: {
    postList: []
  },
  // 页面载入完成执行
  onLoad: async function(op) {
    console.log(op)
    let data = await utils.requestPromise('GET', '/api/announcement', {
      keyword: op.searchValue || "",
      start: 0,
      size: 10
    })
    this.setData({
      postList: data.data
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:async function () {

  },
  // 跳到详情页
  moveTodetail: function(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
      success: function(res) {
        // success
        // console.log('success');

      }
    })
  },
  // 收藏
  addFavor: async function(option) {
    let index = option.currentTarget.dataset.index
    await utils.requestPromise('POST', '/api/favorite', {
      otherId: index,
      type: 1
    }).then((res) => {
      if (res.data.retCode === 0) {
        wx.showToast({
          title: '收藏成功',
        })
      } else {
        wx.showToast({
          title: '收藏失败',
        })
      }
    })
  },
  // 获取输入的值
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  // 搜索页的搜索匹配
  bindSearch: function() {},
  bindDetail: function(option) {
    let index = option.currentTarget.dataset.index
    wx.navigateTo({
      url: `../detail/detail?index=${index}`,
    })
  }
})