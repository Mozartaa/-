// pages/myrecruit/myrecruit.js
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    all: []
  },
  onTabsItemTap: function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentTabIndex: index
    })
  },
  // 编辑
  redictToview: function(op) {
    const id = op.target.dataset.id
    const state = op.target.dataset.state || 0
    console.log('编辑招募令', op)
    wx.navigateTo({
      url: `/pages/modify_issue/modify_issue?proId=${id}&state=${state}`,
    })
  },
  // 标记为已完成
  markcompleted: async function(op) {
    console.log("标记为完成", op)
    const id = op.target.dataset.id
    // 获取被修改招募令的信息
    await utils.requestPromise('PUT', '/api/announcement/state', {
      announcementId: id,
      state: 1,
    }).then(res => {
      console.log("修改状态为1，已完成", res)
      wx.showModal({
        title: '提示',
        content: '修改成功',
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '修改失败',
        icon: "none"
      })
    })
    this.onShow()
  },
  // 标记为失效
  markfail: async function(op) {
    console.log("标记为失效", op)
    const id = op.target.dataset.id;
    // 修改招募令状态
    // 失效
    await utils.requestPromise('PUT', '/api/announcement/state', {
      announcementId: id,
      state: 2,
    }).then(res => {
      console.log("修改状态为2，已失效", res)
      wx.showModal({
        title: '提示',
        content: '修改成功',
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '修改失败',
        icon: "none"
      })
    })
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    utils.requestPromise('GET', '/api/announcementByUserId', '')
      .then(res => {
        console.log("获取我的招募令列表", res)
        const announcements = res.data.data.announcements.map(i => {
          i.proStart = this.format(i.proStart)
          i.enrollDeadline = this.format(i.enrollDeadline)
          return i
        })
        this.setData({
          all: announcements,
          being: announcements.filter(i => i.state === 0 || i.state === null),
          completed: announcements.filter(i => i.state === 1),
          invalid: announcements.filter(i => i.state === 2),
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
  // 时间格式化
  format: function(time) {
    const d = new Date(time)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  },
  
  //发布一条招募令
  postSearch: function () {
    wx.navigateTo({
      url: '/pages/recruit_issue/recruit_issue',
    })
  }
})