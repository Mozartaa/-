// pages/showinfo/showinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //跳到“基本信息”的页面的事件处理函数
  jumpToshowinfoPage: function() {
    wx.navigateTo({
      url: '../showinfo/showinfo'
    })
  },
  jumpToIden: () => {
    wx.navigateTo({
      url: '../iden/iden'
    })
  },
  jumpToFavour: () => {
    wx.navigateTo({
      url: '../favourite/favourite'
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