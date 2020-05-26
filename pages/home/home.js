// 获取应用实例
var app = getApp();

Page({
  data: {
    searchValue: '',
    islogin: false
  },
  onShow: function() {
    this.setData({
      islogin: app.globalData.islogin
    })
    console.log('global Data:', app.globalData)
  },
  SearchKeyWord: function(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../search/search?searchValue=' + type
    })
  },
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  bindSearch: function() {
    // 判断是否已经登录
    if(!this.data.islogin){
      wx.showToast({
        icon:'none',
        title: '请先注册/登录后使用该功能',
      })
      return
    }
    wx.showLoading({
      title: '搜索中',
    })

    wx.navigateTo({
      url: '../search/search?searchValue=' + this.data.searchValue || '',
      success: (res) => {
        wx.hideLoading()
      }
    })
    wx.hideLoading()
  }
})