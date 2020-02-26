const HOST = "https://www.mozarta.cn:8088"
// jq param
const _param = function(a, traditional) {
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  }

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };

  var
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {

      // Serialize array item.
      obj.forEach(function(v, i) {
        if (traditional || rbracket.test(prefix)) {

          // Treat each array item as a scalar.
          add(prefix, v);

        } else {

          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(
            prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
            v,
            traditional,
            add
          );
        }
      });

    } else if (!traditional && toType(obj) === "object") {

      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }

    } else {

      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  var param = function(a, traditional) {
    var prefix,
      s = [],
      add = function(key, valueOrFunction) {

        // If value is a function, invoke it and use its return value
        var value = isFunction(valueOrFunction) ?
          valueOrFunction() :
          valueOrFunction;

        s[s.length] = encodeURIComponent(key) + "=" +
          encodeURIComponent(value == null ? "" : value);
      };

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(a)) {

      // Serialize the form elements
      a.forEach(function(item) {
        add(item.name, item.value);
      });

    } else {

      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }

    // Return the resulting serialization
    return s.join("&");
  };
  return param(a, traditional);
}

const requestPromise = async(method, url, data) => {
  let token = wx.getStorageSync("token")
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: `${HOST}${url}`,
      data: _param(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      },
      success: res => resolve(res),
      fail: (res) => {
        console.log("网络连接错误")
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
          console.log(`上传成功`, JSON.parse(res.data))
          resolve([JSON.parse(res.data).data.url, ...await upload(list.slice(1))])
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