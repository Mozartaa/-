// 获取应用实例
var app = getApp();
import utils from '../../utils/util.js'
Page({
  // 需要用到的数据
  data: {
    postList: [{
        id: "1",
        projectName: "小程序开发",
        field: "大数据",
        channel: "线下",
        bonus: "无"
      },
      {
        id: "2",
        projectName: "小程序开发",
        field: "大数据",
        channel: "线上",
        bonus: "￥100"
      },
      {
        id: "3",
        projectName: "小程序开发",
        field: "大数据",
        channel: "线下",
        bonus: "$100"
      },
      {
        id: "4",
        projectName: "小程序开发",
        field: "大数据",
        channel: "线下",
        bonus: "无"
      },
      {
        id: "5",
        projectName: "小程序开发",
        field: "大数据",
        channel: "线下",
        bonus: "无"
      },
    ]
  },
  // 页面载入完成执行
  onLoad: async function(op) {
    console.log(op)
    let data = await utils.requestPromise('GET', '/api/announcement', {
      keyword: op.searchValue || ""
    })
    // this.setData({
    //   postList:data.data
    // })
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
  // 获取输入的值
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  // 搜索页的搜索匹配
  bindSearch: function() {},
  bindDetail: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})