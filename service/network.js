export default function (options) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: options.url,
      method: options.method || "get",
      header: options.header || {},
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}