import {timeout,baseURL} from "./config"
export default function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || "get",
      header: options.header || {},
      data: options.data || {},
      success: resolve,
      fail: reject,
      timeout: timeout,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}