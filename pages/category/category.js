// pages/category/category.js
import {getCategory,getSubcategory,getCategoryDetail} from "../../service/category_network"
Page({
  data: {
    //menu数据
    list: [],
    currentIndex: 0,
    //商品推荐数据
    CategoryDetail: [],
    //商品细分类数据
    Subcategory: []
  },
  onLoad: function (options) {
    this._getCategory();
  },
  //获取商品分类menu数据的方法
  _getCategory() {
    getCategory().then((res) => {
      const data = res.data.data;
      this.setData({
        list: data.category.list
      })
      //初始化onload页面时的数据第一个分类的数据
      this._getSubcategory(0);
      this._getCategoryDetail(0,"pop")
    }).catch(err => {
      console.log(err,"获取分类menu数据失败")
    })
  },
 //根据maitkey获取menu对应细化分类数据
  _getSubcategory(currentIndex) {
    const maitkey = this.data.list[currentIndex].maitKey;
    getSubcategory(maitkey).then(res => {
      this.setData({
        Subcategory: res.data.data.list,
      })
    }).catch(err => {
      console.log(err,"获取分类内容类型数据失败")
    })
  },
   //根据menu类型、maitWallkey、推荐类型获取推荐数据的方法
  _getCategoryDetail(currentIndex,type) {
    const miniWallKey = this.data.list[currentIndex].miniWallkey;
    getCategoryDetail(miniWallKey,type).then(res=> {
      this.setData({
        CategoryDetail: res.data,
      })
    }).catch(err => {
      console.log(err,"获取详细分类内容失败");
    })
  },
  //监听点击menu时的事件
  menuchange(options) {
    const index = options.detail.index;
    this.setData({
      currentIndex: index
    })
    //根据当前index获取新的细分类数据
    this._getSubcategory(index);
    //根据当前index获取推荐数据
    this._getCategoryDetail(index,"pop")
  },
  changeType(options) {
    const type = options.detail.index;
    switch(type){
      case 0: {
        this._getCategoryDetail(this.data.currentIndex,"pop");
        break;
      }
      case 1: {
        this._getCategoryDetail(this.data.currentIndex,"new");
        break;
      }
      case 2: {
        this._getCategoryDetail(this.data.currentIndex,"sell");
        break;
      }
      default: {
         wx.showToast({
           title: '获取数据类型错误!!!',
           icon: "none"
         })
      }
    }
  }
})