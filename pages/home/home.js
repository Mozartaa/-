// 获取应用实例
var app = getApp();

Page({
  SearchKeyWord: function (e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../search/search?type=' + type
    })
  },
  bindInput: function (e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
  },
  bindSearch: function () {
    wx.showLoading({
      title: '搜索中',
    })

    wx.navigateTo({
      url: '../search/search?searchValue=' + this.data.searchValue,
      success: (res) => {
        wx.hideLoading()
      }
    })
  },
  postSearch: function () {
    wx.navigateTo({
      url: '/pages/recruit_issue/recruit_issue',
    })
  }
})