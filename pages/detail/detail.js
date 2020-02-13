// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: {
      projectName: "学科交叉信息共享小程序开发 | 大数据算法国家工程实验室",
      field: "小程序开发",
      discription: "项目旨在打造跨学科科研合作互联互通平台，以及导师和学生高效对接的渠道。项目涉及微信小程序开发、数据挖掘、数据分析等方向。",
      bonus: "50元/人",
      startTime: "2020.2.3",
      proLen: "30天",
      request: "本科二年级及以上，有一定编程基础",
      places: "8-10人",
      proType: "线下参与",
      rgstDDL: "2020.1.20",
      rgstMethod: "有意向者可联系: \n 管理学院赵玺老师 \n 电话：12345678901 \n邮箱：…@163.com", 
      img: '../../images/bigdata.png'
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindBack: function(){
    wx.navigateTo({
      url: '../search/search'
  })
  }
})