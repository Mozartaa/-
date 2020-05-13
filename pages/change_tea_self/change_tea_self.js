// pages/ChangeInfo/ChangeInfo.js
import utils from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  bindKeyInput: function(e) {
    this.setData({
      [`user.${e.target.dataset.index}`]: e.detail.value
    })
  },
  check: function() {
    // 检查邮箱
    let email = this.data.user.userEmail
    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) && email !== "" && email !== null) {
      wx.showToast({
        title: '邮箱有误',
        icon: 'none',
    })
      return false;
    }
    return true
  },
  submit: async function() {
    let that = this
    console.log('格式检查', this.check())
    if (!this.check()) {
      return
    }
    console.log(this.data.user)
    await utils.updateUserInfo({
      userNICKNAME: that.data.user.userNICKNAME,
      userNICKNAME: that.data.user.userNICKNAME || "",
      userEMAIL: that.data.user.userEMAIL || "",
      userPHONE: that.data.user.userPHONE || "",
      userSignature: that.data.user.userSignature || "",
    })
    wx.showToast({
      title: '修改成功'
    })
    setTimeout(() => {
      wx.navigateBack({})
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let res = await utils.getUserInfo()
    this.setData({
      user: res.user
    })
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