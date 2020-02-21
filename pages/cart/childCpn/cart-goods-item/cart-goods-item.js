// pages/cart/childCpn/cart-goods-item/cart-goods-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object
    },
    index: {
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
    onCheckClick(event) {
      // 1.查找到购物车中对应的商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      //2.将对应的商品的数据修改保存在另一个对象中
      goods.checked = !goods.checked
      //3.获取当前商品在购物车商品中的index
      const index = event.currentTarget.dataset.index;
      //使用在cart中定义在app上的全局函数作为本方法的回调,修改按钮状态及数据
      app.changeGoodsState(index, goods)
    },
    cartDetail() {
      const index = this.data.index;
      const iid = this.data.goods.iid;
      //根据iid跳转到对应的detail页面
      wx.navigateTo({
        //保留原页面，根据iid跳转到对应detail页面
        url: '/pages/details/details?iid=' + iid,
      })
    }
  }
})
