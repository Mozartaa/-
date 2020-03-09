// pages/index-search/index-search.js
import utils from '../../utils/util.js'
const Max = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    postList: [],
    end: false,
    page: 1,
  },
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  bindSearch: async function() {
    let that = this;
    wx.showLoading({
      title: '搜索中',
    })
    // 查询教授
    let data = await utils.requestPromise('GET', '/teachersinfo', {
      keyword: that.data.searchValue,
      start: 1,
      size: Max,
    })
    // 添加收藏标记
    for (let item of data.data) {
      let flag = this.data.favor.findIndex((i) => i.id === item.id);
      if (flag !== -1) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    }
    this.setData({
      postList: data.data,
      end: (data.data.length < Max) ? true : false,
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(op) {
    console.log(op)
    let data = await utils.requestPromise('GET', '/teachersinfo', {
      keyword: op.searchValue || "",
      start: 1,
      size: Max,
    })
    // 查询教授
    let favor = await utils.requestPromise('GET', '/api/favorites', {
      type: 0,
    })
    // 添加收藏标记
    for (let item of data.data) {
      let flag = favor.data.data.teachers.findIndex((i) => i.id === item.id);
      if (flag !== -1) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    }
    // 同步数据
    this.setData({
      searchValue: op.searchValue || "",
      postList: data.data,
      end: (data.data.length < Max) ? true : false,
      favor: favor.data.data.teachers,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    console.log("append list");
    const that = this;
    if (!this.data.end) {
      // 感觉这里有问题
      let data = await utils.requestPromise('GET', '/teachersinfo', {
        keyword: this.data.searchValue,
        start: this.data.page * Max + 1,
        size: Max,
      })
      for (let item of data.data) {
        let flag = this.data.favor.findIndex((i) => i.proId === item.proId);
        if (flag !== -1) {
          item.flag = true;
        } else {
          item.flag = false;
        }
      }
      this.setData({
        postList: this.data.postList.concat(...data.data),
        page: this.data.page + 1,
        end: (data.data.length < Max) ? true : false,
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //收藏
  close_tap: async function(option) {
    let that = this;
    let id = option.currentTarget.dataset.id;
    let index = this.data.postList.findIndex(i => i.id === id);
    await utils.requestPromise('POST', '/api/favorite', {
      otherId: id,
      type: 0,
    }).then((res) => {
      if (res.data.retCode === 0) {
        wx.showToast({
          title: '收藏成功',
        })
        this.setData({
          [`postList[${index}].flag`]: true,
        })
      } else {
        wx.showToast({
          title: '收藏失败',
          icon: 'none',
        })
      }
    })
  },
  // 取消收藏
  open_tap: async function(option) {
    let that = this;
    let id = option.currentTarget.dataset.id;
    let index = this.data.postList.findIndex(i => i.id === id);
    await utils.requestPromise('DELETE', '/api/favorite', {
      otherId: id,
      type: 0,
    }).then((res) => {
      if (res.data.retCode === 0) {
        this.setData({
          [`postList[${index}].flag`]: false,
        })
      } else {
        wx.showToast({
          title: '取消失败',
          icon: 'none',
        })
      }
    })
  },
})