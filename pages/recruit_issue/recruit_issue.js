// pages/recruit_issue/recruit_issue.js
const app = getApp();
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    current: 0,
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onFormSubmitTap: async function(event) {
    console.log('start', event)
    let data = event.detail.value
    wx.showLoading({
      title: '正在提交...',
    })
    utils.upload(this.data.images)
      .catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '上传失败',
        })
      }).then(res => {
        console.log(res)
        data.imagesPath = res
        utils.requestPromise('POST', '/api/announcement', data)
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.InitImageSize();
  },


  // 添加图片
  onAddImageTap: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      success: function(res) {
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
  onImageTap: function(event) {
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
  onRemoveImageTap: function(event) {
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
  InitImageSize: function() {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var containerWidth = windowWidth - 60;
    var imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    })
  },

  onCreateTap: function(event) {
    var that = this;
    console.log(event);
    wx.request({
      success: function(res) {
        console.log(res);
        console.log("mid====" + res.data.mid);
        that.uploadImage(res.data.mid);
      }
    })
  },

})