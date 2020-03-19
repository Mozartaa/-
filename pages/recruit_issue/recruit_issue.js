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
    proStart: '',
    enrollDeadline: '',
    erollWay: "线上合作",
    proReward: "直接酬金",
  },
  bindDateChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      proStart: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enrollDeadline: e.detail.value
    })
  },
  bindDateChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      erollWay: (e.detail.value === "0") ? '线上合作' : '线下参与',
    })
  },

  data: {
    images: [],
    current: 0,
    proStart: '',
    enrollDeadline: '',
    erollWay: "线上合作",
    proReward: "直接酬金",
  },
  bindDateChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      proStart: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enrollDeadline: e.detail.value
    })
  },
  bindDateChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      erollWay: (e.detail.value === "0") ? '线上合作' : '线下参与',
    })
  },
  bindDateChange4: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _ = e.detail.value
    if (_ === "0") {
      _ = '直接酬金';
    } else if (_ === "1") {
      _ = '间接酬金';
    } else {
      _ = '无酬金';
    }
    this.setData({
      proReward: _,
    })
  },

  onFormSubmitTap: async function(event) {
    console.log('start', event)
    let data = event.detail.value
    // 数据验证
    if (data.proName === '') {
      wx.showToast({
        title: '项目名称不能为空',
        icon: 'none',
      })
      return
    }
    if (this.data.proStart === '') {
      wx.showToast({
        title: '项目开始时间不能为空',
        icon: 'none',
      })
      return
    }
    if (this.data.enrollDeadline === '') {
      wx.showToast({
        title: '报名截止时间不能为空',
        icon: 'none',
      })
      return
    }
    // 数据验证结束
    // 增加字段
    // 开始时间
    data.proStart = this.data.proStart.split('-').join('/')
    // 结束时间
    data.enrollDeadline = this.data.enrollDeadline.split('-').join('/')
    // 状态
    data.state = 0
    wx.showLoading({
      title: '正在提交...',
    })
    utils.upload(this.data.images)
      .catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      })
      .then(async(res) => {
        data.imagesPath = res
        let response = await utils.requestPromise('POST', '/api/announcement', data)
        wx.hideLoading()
        console.log(response)
        if (response.data.retCode === -1) {
          wx.showModal({
            title: '发布失败',
            content: '身份未认证',
          })
        } else {
          wx.showToast({
            title: '发布成功'
          })
          setTimeout(() => {
            wx.navigateBack({})
          }, 1600)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.InitImageSize();
    let user = wx.getStorageSync('user')
    if (user.authenticate === 0 || user.authenticate === -1 || user.authenticate === -2) {
      wx.showModal({
        title: '提示',
        content: '尚未认证，无法正常提交表单',
      })
    }
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