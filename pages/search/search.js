// 获取应用实例
var app = getApp();
import utils from '../../utils/util.js'
const Max = 10;

Page({
  // 需要用到的数据
  data: {
    searchValue: "",
    postList: [],
    end: false,
    page: 1,
    tip: "",
  },
  // 页面载入完成执行
  onLoad: async function(op) {
    console.log("load search page", op)
    let data = await utils.requestPromise('GET', '/api/announcement', {
      keyword: op.searchValue || "",
      start: 1,
      size: Max,
    })
    // 查询招募令
    let favor = await utils.requestPromise('GET', '/api/favorites', {
      type: 1,
    })
    // 添加收藏标记
    for (let item of data.data) {
      let flag = favor.data.data.announcements.findIndex((i) => i.proId === item.proId);
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
      favor: favor.data.data.announcements,
    })
    if (data.data.length === 0) {
      this.setData({
        tip: "很抱歉，没有找到与搜索词相关的招募令",
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    console.log("append list");
    wx.showLoading({
      title: 'loading...',
    })
    const that = this;
    if (!this.data.end) {
      // 感觉这里有问题
      let data = await utils.requestPromise('GET', '/api/announcement', {
        keyword: this.data.searchValue,
        start: this.data.page * Max + 2,
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
    wx.hideLoading()
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
    let that = this;
    let index = option.currentTarget.dataset.index
    await utils.requestPromise('POST', '/api/favorite', {
      otherId: index,
      type: 1
    }).then((res) => {
      if (res.data.retCode === 0) {
        wx.showToast({
          title: '收藏成功',
        })
        that.data.postList.find(i => i.proId === index).flag = true
      } else {
        wx.showToast({
          title: '收藏失败',
          icon: 'none',
        })
      }
    })
  },
  // 取消收藏
  cancelFavor: async function(option) {
    let that = this;
    let index = option.currentTarget.dataset.index
    await utils.requestPromise('DELETE', '/api/favorite', {
      otherId: index,
      type: 1,
    }).then((res) => {
      if (res.data.retCode === 0) {
        that.data.postList.find(i => i.proId === index).flag = true
      } else {
        wx.showToast({
          title: '取消失败',
          icon: 'none',
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
  bindSearch: async function() {
    let data = await utils.requestPromise('GET', '/api/announcement', {
      keyword: this.data.searchValue,
      start: 1,
      size: Max,
    })
    // 添加收藏标记
    for (let item of data.data) {
      let flag = this.data.favor.findIndex((i) => i.proId === item.proId);
      if (flag !== -1) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    }
    // 同步数据
    this.setData({
      postList: data.data,
      end: (data.data.length < Max) ? true : false,
    })
    if (data.data.length === 0) {
      this.setData({
        tip: "很抱歉，没有找到与搜索词相关的招募令",
      })
    }
  },
  bindDetail: function(option) {
    let index = option.currentTarget.dataset.index
    wx.navigateTo({
      url: `../detail/detail?index=${index}`,
    })
  }
})