import utils from '../../utils/util.js'
const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 个人数据
          utils.getUserInfo()
            .then(r => {
              wx.setStorageSync('user', r.user)
              wx.showToast({
                title: '登录成功',
                duration: 2000,
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            })
            .catch(() => {
              // token失效后重新登录
              wx.login({
                success: res => {
                  wx.getUserInfo({
                    success: e => {
                      console.log(e, res);
                      wx.request({
                        url: utils.HOST + '/api/user/login',
                        method: "POST",
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          rawData: e.rawData,
                          code: res.code
                        },
                        success: async(results) => {
                          console.log(results.data);
                          if (results.data.retCode == 0) {
                            wx.setStorageSync('token', results.data.data.token);
                            let r = await utils.getUserInfo()
                            wx.setStorageSync('user', r.user)
                            wx.hideLoading();
                            wx.showToast({
                              title: '登录成功',
                              duration: 2000,
                              success: () => {
                                wx.switchTab({
                                  url: '/pages/index/index',
                                })
                              }
                            })
                          } else {
                            wx.hideLoading();
                            wx.showToast({
                              title: '登录失败',
                              icon: 'none',
                            })
                          }
                        },
                        // fail: err => {
                        //   console.log("重新登录失败", err)
                        // }
                      })
                    }
                  })
                }
              })
            })
        }
      },
      fail: function() {
        wx.showToast({
          title: '登录后才可以继续体验',
          icon: 'none',
        });
        return;
      }
    })
  },
  bindGetUserInfo: async function(e) {
    var that = this;
    console.log(e.detail.rawData)
    wx.showLoading({
      title: '正在登录中...',
    })
    if (e.detail.rawData == undefined) {
      console.log("不存在")
      wx.showToast({
        icon: 'none',
        title: '授权后才可以继续进行',
      });
      return;
    } else {
      wx.login({
        success: res => {
          wx.request({
            url: utils.HOST + '/api/user/login',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              rawData: e.detail.rawData,
              code: res.code
            },
            success: async(results) => {
              console.log(results.data);
              if (results.data.retCode == 0) {
                wx.setStorageSync('token', results.data.data.token);
                let r = await utils.getUserInfo()
                wx.setStorageSync('user', r.user)
                wx.hideLoading();
                wx.showToast({
                  title: '登录成功',
                  duration: 2000,
                  success: () => {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                })
              }
            }
          })

        }
      })
    }
  }
})