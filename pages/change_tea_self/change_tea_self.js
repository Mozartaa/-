// pages/ChangeInfo/ChangeInfo.js
import utils from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  bindKeyInput: function(e) {
    this.setData({
      [`${e.target.dataset.index}`]: e.detail.value
    })
  },
  check: function() {
    // 检查邮箱
    let email = this.data.email||''
    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))) {
      wx.showToast({
        title: '邮箱格式有误',
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
    console.log(this.data)
    await utils.updateUserInfo({
      profession: that.data.profession || '', //职称
      office: that.data.office || '', //办公地址
      email: that.data.email || '',
      message: that.data.message || '', //教师寄语
      department: that.data.department || '', //研究领域
      sci_information: that.data.sci_information || '', //科研成果
      per_homepage: that.data.per_homepage || '', //个人主页
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
    const that=this
    let res = await utils.getUserInfo()
    that.setData({
      username: res.username||'',
      // username: 'abc',
      profession: res.profession || '', //职称
      college: res.college || '',
      office: res.office || '', //办公地址
      email: res.email || '',
      message: res.message || '', //教师寄语
      department: res.department || '', //研究领域
      sci_information: res.sci_information || '', //科研成果
      per_homepage: res.per_homepage || '', //个人主页
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