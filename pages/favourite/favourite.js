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
})