// pages/cart/childCpn/bottom-bar/bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkAll() {
      this.triggerEvent("checkAll",{},{})
    },
    settlement() {
      wx.showActionSheet({
        itemList: ['微信支付', '支付宝支付', '银联账号支付'],
        success (res) {
          switch(res.tapIndex) {
            case 0 :{
              wx.showLoading({
                title: '正在调用微信支付接口'
              })
              setTimeout(() => {
                wx.hideLoading({
                  success: function() {
                    wx.showToast({
                      title: '调用银联支付接口失败，订单无法结算',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              },5000)
              break;
            }
            case 1 :{
              wx.showLoading({
                title: '正在调用支付宝支付接口'
              })
              setTimeout(() => {
                wx.hideLoading({
                  success: function() {
                    wx.showToast({
                      title: '调用银联支付接口失败，订单无法结算',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              },5000)
              break;
            }
            case 2 :{
              wx.showLoading({
                title: '正在调用银联支付接口'
              })
              setTimeout(() => {
                wx.hideLoading({
                  success: function() {
                    wx.showToast({
                      title: '调用银联支付接口失败，订单无法结算',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                })
              },5000)
              break;
            }
          }
        },
        fail (res) {
          console.log("error")
        }
      })
    }
  }
})
