// pages/details/details.js
import {getDetailData,GoodsBaseInfo,ShopInfo,ParamInfo,getRecommends} from "../../service/detail_network"
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
      console.log(res)
      const data = res.data.data;
      this.setData({
        recommends: data.list
      })
    }).catch(err => {
      console.log("获取detail推荐数据失败"+err);
    })
  }
})