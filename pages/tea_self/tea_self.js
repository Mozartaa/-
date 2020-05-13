import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: ""
  },
  //跳到“修改基本信息”的页面的事件处理函数
  jumpTochangeinfoPage: function() {
    wx.navigateTo({
      url: '../change_tea_self/change_tea_self'
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
  onShow: async function() {
    try {
      let res = await utils.getUserInfo()
      this.setData({
        user: res.user
      })
    } catch (err) {
      console.log(err)
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