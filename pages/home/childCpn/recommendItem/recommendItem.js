// pages/home/childCpn/recommendItem.js
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
    imageLoad() {
      this.data.isload = true;
      this.triggerEvent('imageLoaded',{},{});
    }
  }
})
