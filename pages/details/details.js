// pages/details/details.js
import {getDetailData,GoodsBaseInfo,ShopInfo,ParamInfo,getRecommends} from "../../service/detail_network"

//获取app
const app = getApp();
Page({
  data: {
    iid: "",
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: []
  },
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDetailData(this.data.iid);
    this._getRecommends();
  },
  _getDetailData(iid) {
    getDetailData(iid).then(res => {
      const data = res.data.result;

      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;
      // 2.通过构造函数给baseInfo赋值
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      //存储获取到的详情页所有数据
      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    }).catch( err => {
      console.log("加载detail数据失败",err);
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      const data = res.data.data;
      this.setData({
        recommends: data.list
      })
    }).catch(err => {
      console.log("获取detail推荐数据失败"+err);
    })
  },
  //监听到加入购物车被点击事件后
  addcart() {
    //获取商品当前商品数据
    const cartItemInfo = {};
    cartItemInfo.iid = this.data.iid;
    cartItemInfo.images = this.data.topImages[0];
    cartItemInfo.title = this.data.baseInfo.title;
    cartItemInfo.desc = this.data.baseInfo.desc;
    cartItemInfo.price = this.data.baseInfo.realPrice;

    //将当前商品数据发送给app
    app.addcart(cartItemInfo);
    //显示成功弹窗
    wx.showToast({
      title: '加入购物车成功',
      duration: 1000,
      mask: true
    })
  }
})