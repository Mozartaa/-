// pages/showinfo/showinfo.js
import utils from '../../utils/util.js'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    islogin: false
  },
  // 跳转登录
  gologin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //跳到“基本信息”的页面的事件处理函数
  jumpToshowinfoPage: function() {
    wx.navigateTo({
      url: '../showinfo/showinfo'
    })
  },
  jumpToIden: function() {
    wx.navigateTo({
      url: '../iden/iden'
    })
  },
  jumpToMyrecruit: function() {
    wx.navigateTo({
      url: '../myrecruit/myrecruit'
    })
  },
  jumpToFavour: function() {
    wx.navigateTo({
      url: '../favourite/favourite'
    })
  },
  jumpToTea_self: function() {
    wx.navigateTo({
      url: '../tea_self/tea_self'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    // 从app中获取是否已经登录
    this.setData({
      islogin: app.globalData.islogin
    })
    console.log('global Data:', app.globalData)
    if (app.globalData.islogin) {
      let res = wx.getStorageSync('user')
      let tip;
      if (res.authenticate === 0) {
        tip = '未认证';
      } else if (res.authenticate == -1) {
        tip = '审核中';
      } else if (res.authenticate == -2) {
        tip = '认证失败';
      } else if (res.authenticate == 1) {
        tip = '老师';
      } else if (res.authenticate == 2) {
        tip = '学生';
      }
      this.setData({
        user: res,
        tip: tip,
      })
    }
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

  }
})