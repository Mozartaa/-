// pages/recruit_issue/recruit_issue.js
const app = getApp();
const url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    current:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.InitImageSize();
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

  // 添加图片
  onAddImageTap: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      success: function (res) {
        //console.log(res);
        const tempImages = res.tempFilePaths;
        var oldImages = that.data.images;
        var newImages = oldImages.concat(tempImages);
        that.setData({
          images: newImages
        });
        //console.log(newImages.length)
      },
    })
  },
  // 图片预览
  onImageTap: function (event) {
    var that = this;
    var index = event.target.dataset.index;
    var urls = this.data.images;
    var current = this.data.images[index];
    wx.previewImage({
      urls: urls,
      current: current
    })
  },


  // 删除图片
  onRemoveImageTap: function (event) {
    console.log(event);
    var index = event.currentTarget.dataset.index;
    console.log(index);
    var images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    })
  },

  // 初始化图片大小
  InitImageSize: function () {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var containerWidth = windowWidth - 60;
    var imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    })
  },

  onCreateTap: function (event) {
    var that = this;
    console.log(event);
    wx.request({
      success: function (res) {
        console.log(res);
        console.log("mid====" + res.data.mid);
        that.uploadImage(res.data.mid);
      }
    })
  },

  /**
   * 上传图片
   */
  uploadImage: function (mid) {
    const images = this.data.images;
    // console.log(images.length);
    console.log(images);
    for (var i = 0; i < images.length; i++) {
      console.log(images[i]);
      wx.uploadFile({
        url: url + '/uploadImgTest', //仅为示例，非真实的接口地址
        filePath: images[i],
        name: 'file',
        formData: {
          mid: mid
        },
        success: function (res) {
          var data = res.data
          console.log(data)
        }
      })
    }
  },
})