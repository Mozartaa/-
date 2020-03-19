// pages/myrecruit/myrecruit.js
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    all: [{
      name: 'test',
      time: "1999",
      require: "none"
    }],
    being: [],
    completed: [],
    invalid: []
  },
  onTabsItemTap: function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentTabIndex: index
    })
  },
  // 编辑
  redictToview: function(op) {
    const id = op.target.id
    console.log('编辑招募令', op)
    wx.navigateTo({
      url: `/pages/modify_issue/modify_issue?proId=${id}`,
    })
  },
  // 标记为已完成
  markcompleted: async function(op) {
    console.log("标记为完成", op)
    const id = op.target.id
    this.onLoad()
  },
  // 标记为失效
  markfail: async function(op) {
    console.log("标记为失效", op)
    const id = op.target.id
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    await utils.requestPromise('GET', '/api/announcementByUserId', '')
      .then(res => {
        console.log(res)
        this.setData({
          all: res.data.data.announcements
        })
      }).catch(err => {
        console.log(err)
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