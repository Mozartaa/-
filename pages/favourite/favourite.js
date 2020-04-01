// pages/favourite/favourite.js
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    all: [],
    teachers: [],
    announcements: []
  },
  onTabsItemTap: function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentTabIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let response = await utils.requestPromise('GET', '/api/favorites', {})
    this.setData({
      teachers: response.data.data.teachers,
      announcements: response.data.data.announcements
    })
  },

  // 复制
  copyTBL: function(e) {
    let url = e.target.dataset.url
    wx.setClipboardData({
      data: url,
      success: () => {
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function(res) {
        //     if (res.confirm) {
        //       console.log('确定')
        //     } else if (res.cancel) {
        //       console.log('取消')
        //     }
        //   }
        // })
      }
    })
  },
  // 取消招募令收藏
  cancelFavor: function(option) {
    const that = this;
    const id = option.currentTarget.dataset.index;
    console.log('取消收藏,proId', id)
    utils.requestPromise('DELETE', '/api/favorite', {
      otherId: id,
      type: 1,
    }).then(res => {
      if (res.data.retCode === 0) {
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
        })
        // 重新加载
        that.onLoad()
      } else {
        wx.showToast({
          title: '取消失败',
          icon: 'none',
        })
      }
    })
  },
  // 取消收藏教师
  open_tap: async function(option) {
    let that = this;
    let id = option.currentTarget.dataset.id;
    console.log("取消收藏,id:", id)
    await utils.requestPromise('DELETE', '/api/favorite', {
      otherId: id,
      type: 0,
    }).then((res) => {
      if (res.data.retCode === 0) {
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
        })
        that.onLoad()
      } else {
        wx.showToast({
          title: '取消失败',
          icon: 'none',
        })
      }
    })
  },
})