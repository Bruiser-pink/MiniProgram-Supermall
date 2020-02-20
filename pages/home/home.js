// pages/home.js
import {getMultiData, getGoodsData} from "../../service/home_network"
Page({
  data: {
    banners: [],
    recommend: [],
    tabcontroltitles: ["流行","新款","精选"],
    goods: {
      "pop" : {page: 0, list: []},
      "new" : {page: 0, list: []},
      "sell" : {page: 0, list: []}
    },
    currentType: "pop",
    backTopShow: false,
    showTabControl: false,
    tabScrollTop: 0,
    topPosition: 0
  },
  onLoad: function (options) {
    //获取轮播图和推荐数据
    this._getMultiData();
    this._getGoodsData("pop");
    this._getGoodsData("new");
    this._getGoodsData("sell");
  },
  //将获取轮播图和推荐数据抽成一个方法
  _getMultiData() {
    getMultiData().then((res) => {
      const data = res.data.data;
      this.setData({
        banners: data.banner.list,
        recommend: data.recommend.list,
      })
    }).catch((err) => {
      console.log("轮播图数据请求失败");
    })
  },
  _getGoodsData(type) {
    //1.获取页码
    const page = this.data.goods[type].page + 1 ;
    //发送网络请求
    getGoodsData(type,page).then((res) => {
      const list = res.data.data.list;
      //使用一个temp数组来保存原来的data里的list的数据
      const oldList = this.data.goods[type].list;
      //将新请求到的数据push到temp数组中
      oldList.push(...list);
      // 通过es6语法将变量拼接到字符串中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      //将temp数据设置到type对应的list中
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page + 1
      })
      //数据获取成功后，让加载弹窗消失
      wx.hideLoading({
        
      })
    }).catch( err => {
      console.log("获取货物信息失败");
    })
  },
  handleTabClick(event) {
    const index = event.detail.index;
    switch(index) {
      case 0: {
        this.setData({
          currentType: 'pop'
        })
        break;
      }
      case 1: {
        this.setData({
          currentType: 'new'
        })
        break;
      }
      case 2: {
        this.setData({
          currentType: 'sell'
        })
        break;
      }
    }
    //获取两个不同的tabcontrol，使用其组件定义的方法修改currentIndex
    this.selectComponent('.tab-control').setCurrentIndex(event.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(event.detail.index)
  },
  //当图片加载完成后执行此函数
  imageload() {
    //使用此方法获取某个组件距离顶部的高度
    wx.createSelectorQuery().select('#tabcontrol').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top;
    }).exec();
  },
  //监听页面触发到底部后加载更多
  loadingMore() {
    //出现提示加载
    wx.showLoading({
      title: '数据加载中...',
    })
    this._getGoodsData(this.data.currentType);
  },
  backtop() {
    this.setData({
      backTopShow: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },
  handlescroll(event) {
    const scrollTop = event.detail.scrollTop;
    const flag = scrollTop>=1000;
    if(flag!=this.data.backTopShow){
      this.setData({
        backTopShow: flag,
      })
    }
    // 修改showTabControl属性
    //如果滚动距离大于距离顶部高度，让showTabControl为show
    const show = scrollTop >= this.data.tabScrollTop;
    if(show){
      this.setData({
        showTabControl: show
      })
    }else{
      this.setData({
        showTabControl: show
      })
    }
  }
})