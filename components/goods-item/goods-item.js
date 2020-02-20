// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iteminfo: {
      type: Object,
      value: {}
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
    seeDetail() {
      const iid = this.data.iteminfo.iid || this.data.iteminfo.item_id;
      wx.navigateTo({
        //保留原页面，根据iid跳转到对应detail页面
        url: '/pages/details/details?iid=' + iid,
      })
      console.log(iid);
    } 
  }
})
