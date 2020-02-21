//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //此方法为：点击加入购物车按钮后，在detail页面获取加入商品的数据，判断该商品是否已存在，然后选择数量+1或新建item
  addcart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if(oldInfo) {
      oldInfo.count++;
    }else{
      //商品数量为1
      obj.count = 1
      //默认商品添加进去为被选中
      obj.checked = true
      //将商品加入购物车数组
      this.globalData.cartList.push(obj)
    }
    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  globalData: {
    userInfo: null,
    cartList: []
  }
})