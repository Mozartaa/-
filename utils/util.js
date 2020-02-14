const HOST = "http://www.mozarta.cn:8088"
const requestPromise = async(method, url, data) => {
  let token = wx.getStorageSync("token")
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: `${HOST}${url}`,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      },
      success: res => resolve(res),
      fail: (res) => reject(res)
    })
  })
}
module.exports = {
  requestPromise,
  HOST
}