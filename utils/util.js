const HOST = "https://www.mozarta.cn:8088"

const requestPromise = async(method, url, data) => {
  let token = wx.getStorageSync("token")
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: `${HOST}${url}`,
      data: (data),
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      },
      success: res => resolve(res),
      fail: (res) => {
        console.log("网络连接错误", res)
        reject(res)
      }
    })
  })
}

// 获取个人信息
const getUserInfo = async() => {
  let res = await requestPromise('GET', '/api/user/userInfo', {})
  if (res.data.retCode === 0) {
    return res.data.data
  } else {
    return 'error'
  }
}
// 修改个人信息
const updateUserInfo = async(data) => {
  let res = await requestPromise('PUT', '/api/user/userInfo', data)
  if (res.data.retCode === 0) {
    return 'success'
  } else {
    return 'error'
  }
}
// 多文件上传
const upload = async(list) => {
  if (list.length === 0) {
    return []
  } else {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync("token")
      wx.uploadFile({
        url: HOST + '/api/auth/proof',
        filePath: list[0],
        name: 'file',
        header: {
          'token': token
        },
        success: async(res) => {
          if (JSON.parse(res.data).retCode === -1) {
            console.log(JSON.parse(res.data))
            reject("上传失败")
          } else {
            console.log(`上传成功`, JSON.parse(res.data))
            resolve([JSON.parse(res.data).data.url, ...await upload(list.slice(1))])
          }
        },
        fail: res => {
          console.log(res)
          reject("上传失败")
        }
      })
    })

  }
}
module.exports = {
  requestPromise,
  HOST,
  // user
  getUserInfo,
  updateUserInfo,
  upload
}