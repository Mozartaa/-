// pages/ChangeInfo/ChangeInfo.js
import utils from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userSex: "m",
    userNick: "",
    userSignature: "",
    userPhone: "",
    userEmail: "",
    items: [{
        name: 'm',
        value: '男'
      },
      {
        name: 'f',
        value: '女'
      },
      {
        name: 'secret',
        value: '保密',
        checked: 'true'
      },
    ]
  },
  bindKeyInput: function(e) {
    this.setData({
      [e.target.dataset.index]: e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      userSex: e.detail.value
    })
  },
  check: function() {
    // 检查电话
    if (!(/^1[3456789]\d{9}$/.test(this.data.userPhone)) && this.data.userPhone !== "") {
      wx.showToast({
        title: '手机号码有误',
      })
      console.log(123)
      return false;
    }
    // 检查邮箱
    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.data.userEmail)) && this.data.userEmail !== "") {
      wx.showToast({
        title: '邮箱有误',
      })
      return false;
    }
    return true
  },
  submit: function() {
    console.log(this.check())
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