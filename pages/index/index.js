//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    searchValue: '',
  },

  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  bindSearch: function() {
    wx.showLoading({
      title: '搜索中',
    })

    wx.navigateTo({
      url: '../index-search/index-search?searchValue=' + this.data.searchValue || '',
      success: (res) => {
        wx.hideLoading()
      }
    })
  },
  onLoad: async(options) => {
    let that = this
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log("获取用户个人信息", res.userInfo)
            }
          });
          // wx.login({
          //   success: async(res) => {
          //     console.log("用户的code:" + res.code);
          //     wx.setStorageSync("code", res.code)
          //   },
          //   fail: (err) => {
          //     console.log(err)
          //     wx.showToast({
          //       title: '登录失败',
          //       icon: "none",
          //       duration: 2000
          //     })
          //   }
          // })
        } else {
          // 用户没有授权
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }
    })
  }

})