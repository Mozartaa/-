const app = getApp();
const url=app.globalData.url;
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.switchTab({
            url: '/pages/search/search',
          })
        }
        
      },
      fail: function () {
        wx.showToast({
          title: '登录后才可以继续体验',
          image: '../../images/warn.png'
        });
        return;
      }

    })

  },
  bindGetUserInfo: function (e) {
      var that=this;
      wx.showLoading({
        title: '正在登录中...',
      })
    if (e.detail.rawData == undefined){
      console.log("不存在")
      wx.showToast({
        title: '授权后才可以继续进行',
      });
      return;
    }else{
      wx.login({
        success: function (res) {
          var code = res.code;
          console.log(res);
          wx.request({
            url: url + '/login?code=' + code,
            data: {
              rawData: e.detail.rawData
            },
            success: function (results) {
              console.log(results.data);
              if(results.data.retCode==0){
                wx.setStorageSync('token', results.data.data.token);
                wx.hideLoading();
                wx.showToast({
                  title: '登录成功',
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/search/search',
                  })
                }, 100)
              }else{
                wx.hideLoading();
                wx.showToast({
                  title: '登录失败',
                })
              }
              
            }
          })
        },
      })
    }
    }
    
     
      
  
  
})