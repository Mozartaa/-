//app.js
App({
  globalData: {
    islogin: false
  },
  // onLaunch: function(options) {
  //   // 判断用户是否登录
  //   var token = wx.getStorageSync('token')
  //   console.log(token)
  //   // TODO  token 过期问题
  //   if (token) {
  //     console.log("登录过了")
  //     app.globalData.token = token;
  //     console.log(app.globalData.token)
  //     this.loadAllMessages(0, 10);
  //   } else {
  //     console.log("没有登录")
  //     wx.navigateTo({
  //       url: '/pages/login/login',
  //     });
  //   }
  // },
  loadAllMessages: function(start = 0, size = 10, keyword = '') {
    var that = this;
    var hasmoredata = true;
    wx.request({
      url: url + '/teachersinfo',
      data: ({
        start: start,
        size: size,
        keyword: keyword
      }),
      success: function(res) {
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
})