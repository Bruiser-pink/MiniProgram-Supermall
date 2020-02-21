// pages/cart/cart.js
const app = getApp();
Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0,
    cartList: []
  },
  onLoad: function (options) {
    //获取购物车信息
    this.setData({
      cartList: app.globalData.cartList,
    })
    // 2.设置加载完所有cart-goods-item的回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      //计算bottom-bar的数据
      this.changeData()
    }
    //3.设置一个挂载在app实例上的回调方法，在goods-item状态被修改后调用
    app.changeGoodsState = (index,goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      //2.修改全部选中按钮的状态。当在cartList中未找到为checked为false说明为全部选中状态
      const checkAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: checkAll,
      })
      //3.修改bottom-bar的数据
      this.changeData();
    }
  },
  onShow: function() {
    const goodsNum = this.data.cartList.length;
    wx.setNavigationBarTitle({
      title: `购物车(${goodsNum})`,
    })
    this.changeData();
  },
  onSelectAll() {
    //判断当前为全选状态
    if(this.data.isSelectAll) {
      //将所有的状态修改为否,由于this.setData方法不建议在遍历中多次使用，所以先修改cartList数组的元素的内容然后再赋值
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      //修改新的item状态
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else{
      //非全部选中状态
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData();
  },
  //修改bottom-bar的数据的方法
  changeData() {
    let counter = 0;
    let price = 0;
    //遍历当前的商品数组，获取其被选中的商品个数和总价格
    for(let item of this.data.cartList) {
      //如果遍历到的商品被选中
      if(item.checked) {
        counter++;
        price += item.price*item.count;
      }
    }
    this.setData({
      totalPrice: price.toFixed(2),
      totalCounter: counter,
    })
  }
})