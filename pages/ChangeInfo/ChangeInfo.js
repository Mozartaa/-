// pages/ChangeInfo/ChangeInfo.js
import utils from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    items: [{
        name: 'm',
        value: '男'
      },
      {
        name: 'f',
        value: '女'
      },
      // {
      //   name: 'secret',
      //   value: '保密',
      //   checked: 'true'
      // },
    ]
  },
  bindKeyInput: function(e) {
    this.setData({
      [`user.${e.target.dataset.index}`]: e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      ['user.userSex']: e.detail.value
    })
  },
  check: function() {
    // 检查电话
    let phone = this.data.user.userPhone
    if (!(/^1[3456789]\d{9}$/.test(phone)) && phone !== "" && phone !== null) {
      wx.showToast({
        title: '手机号码有误',
      })
      console.log(123)
      return false;
    }
    // 检查邮箱
    let email = this.data.user.userEmail
    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) && email !== "" && email !== null) {
      wx.showToast({
        title: '邮箱有误',
      })
      return false;
    }
    return true
  },
  submit: async function() {
    let that = this
    console.log('格式检查', this.check())
    console.log(this.data.user)
    await utils.updateUserInfo({
      userId: that.data.user.userId,
      userSex: that.data.user.userSex,
      userPhone: that.data.user.userPhone || "",
      userEmail: that.data.user.userEmail || "",
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