// pages/teaiden/teaiden.js
import utils from '../../utils/util.js'
Page({
  data: {
    images: []
  },
  onFormSubmitTap: function(event) {
    console.log("start submit", event)
    var that = this;
    const teacher = event.detail.value;
    // 校验数据
    // if (teacher.name === '' || teacher.school === '' || teacher.profession === '' || teacher.college === '' || teacher.research === '') {
    //   wx.showToast({
    //     title: '不能为空;
    //     icon: 'none',
    //   })
    //   return
    // }
    // 先上图片
    const images = this.data.images;
    console.log(images)
    if (images.length < 1) {
      wx.showToast({
        title: '请上传证件照片',
        icon: 'none',
      });
      return
    }
    wx.showLoading({
      title: '发送认证消息中...',
    });
    // 获取token
    let token = wx.getStorageSync("token")
    wx.uploadFile({
      url: utils.HOST + '/api/auth/proof',
      header: {
        'token': token
      },
      filePath: images[0],
      name: 'file',
      success: function(res) {
        var obj = JSON.parse(res.data);
        if (obj.retCode == 0) {
          // 发送认证信息
          console.log("图片提交成功")
          // 图片储存地址
          let picUrl = obj.data.url;
          // 认证消息
          wx.request({
            url: utils.HOST + '/api/auth/teacher',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            },
            data: {
              name: teacher.name, //教师姓名
              school: teacher.school, //教师学校
              studentNumber: teacher.profession, //教师职位
              college: teacher.college, //教师学院
              major: teacher.research, //研究方向
              proof: picUrl //证件地址
            },
            success: res => {
              wx.hideLoading();
              console.log('认证完毕', res);
              if (res.data.retCode == 0) {
                wx.showToast({
                  title: '认证信息发送成功,请等待工作人员审核。',
                });
                setTimeout(function() {
                  wx.navigateBack({})
                }, 1000);
              } else {
                wx.showToast({
                  title: '认证发送失败...',
                  icon: 'none',
                })
              }
            }
          })
        } else {
          console.log('发送失败', res)
          wx.hideLoading()
          wx.showToast({
            title: '图片上传失败',
            icon: 'none',
          })
        }
      }
    })
  },


  // 添加图片
  onAddImageTap: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res);
        const tempImages = res.tempFilePaths;

        that.setData({
          images: tempImages
        });
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
    console.log('delete pic', event);
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
    console.log(imageSize)
    this.setData({
      imageSize: imageSize
    })
  },
})