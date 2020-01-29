// pages/search/search.js
const app = getApp()
const url = app.globalData.url;
const time = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTop: 0,
    messageLength: 10,
    scrollLeft: 0, //tab滚动条的位置
    messages: [],
    hasmore: true,
    mask:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登录
    var token = wx.getStorageSync('token')
    // TODO  token 过期问题
    if (token) {
      // 
      console.log("登录过了")
      app.globalData.token = token;
      console.log(app.globalData.token)
      this.loadAllMessages(0, 10);
    } else {
      console.log("没有登录")
      wx.navigateTo({
        url: '/pages/login/login',
      });

    }

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  // 加载信息
  loadAllMessages: function (start = 0,size = 10, keyword = '') {
    var that = this;
    var hasmoredata = true;
    wx.request({
      url: url + '/teachersinfo',
      data: ({
        start: start,
        size: size,
        keyword: keyword
      }),
      success: function (res) {
        console.log(res.data);
        if (res.data.length == 0) {
          hasmoredata = false;
          that.setData({
            hasmore: hasmoredata
          })
        };
        var flags = [];
        console.log("返回的数据长度");
        console.log(res.data.length);
        let newMessages = [];
        console.log("start=" + start);
        if (start > 0) {
          newMessages = that.data.messages.concat(res.data);
        } else {
          newMessages = res.data;
        }
        console.log("messageLength")
        console.log(newMessages.length)
        that.setData({
          messages: newMessages,
          messageLength: newMessages.length
        })
      }
    })
  },
 

 /**
  * 查看详情
  */
  onDetailTap:function(event){
    var i = event.currentTarget.dataset.index;
    var detail =this.data.messages[i];
    console.log(detail)
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
    this.loadAllMessages(this.data.messages.length);
  },


  /**
   * 监听搜索点击
   * 
   */
  onFocusEvent: function () {
    this.setData({
      mask: true,
    });
  },

  onBlurEvent: function () {
    this.setData({
      mask: false
    })
  },


  onConfirmEvent: function (event) {
    var keyword = event.detail.value;
    console.log(keyword);
    this.loadAllMessages(0, 10, keyword);
    this.setData({
      keyword: keyword
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})