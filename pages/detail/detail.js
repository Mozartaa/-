// pages/detail.js
import utils from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const that = this;
    let index = options.index;
    await utils.requestPromise("GET", '/api/announcementById', {
      id: index,
    }).then(res => {
      that.setData({
        proList: res.data,
        proStart: that.format(res.data.proStart),
        enrollDeadline: that.format(res.data.enrollDeadline),
        images: res.data.images.map(i => i.imagePath)
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '网络错误',
        icon: 'none',
      })
    })
  },
  format: function(time) {
    const d = new Date(time)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindBack: function() {
    wx.navigateBack({

    })
  }
})