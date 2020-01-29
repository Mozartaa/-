// pages/stuiden/stuiden.js
const app = getApp()
const url = app.globalData.url;
const time = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 
   * 提交表单
   */
  onFormSubmitTap: function(event) {
    var that = this;
    const student = event.detail.value;
    const name = student.name;
    const school = student.school;
    const studentNumber = student.studentNumber;
    const college = student.college;
    const major = student.major;
    console.log(student)
    // 先上图片
    const images = this.data.images;
    console.log(images)
    if (images.length < 1) {
      wx.showToast({
        title: '请上传证件照片',
      });
      return
    }

    wx.showLoading({
      title: '发送认证消息中...',
    });

    wx.uploadFile({
      url: url + '/authImageUpload',
      filePath: images[0],
      name: 'file',
      success: function (res) {
        console.log(res)
        console.log(res.data)
        var obj = JSON.parse(res.data);

        console.log(obj)
        if (obj.retCode == 0) {
          // 发送认证信息
          const picUrl = obj.data.url;
          that.auth(student,picUrl)
        }
      }
    })
  },
/**
 * 上传图片
 */
uploadImage: function() {

  

},


auth:function(student,picUrl){
  const token = wx.getStorageSync("token");
  console.log(token)
  wx.request({
    url: url + '/stuAuthentication',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "token": token
    },
    data: ({
      name: student.name,
      school: student.school,
      studentNumber: student.studentNumber,
      college: student.college,
      major: student.major,
      proof: picUrl
    }),
    success: res => {
      wx.hideLoading();
      console.log(res);
      if (res.data.retCode == 0) {
        wx.showToast({
          title: '认证发送成功,请等待工作人员审核...',
        });
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000);
      } else {
        wx.showToast({
          title: '认证发送失败。。。',
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
  console.log(imageSize)
  this.setData({
    imageSize: imageSize
  })
},

})