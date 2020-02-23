// pages/category/childCpn/content/w-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ishidden:true ,
    topPosition: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(options) {
      const index = options.detail.index;
      this.triggerEvent("changeType",{index})
    },
    onScroll(position) {
      const scrollTop = position.detail.scrollTop;
      const flag = scrollTop>=1000;
      this.setData({
        ishidden: !flag
      })
    },
    backTop() {
      this.setData({
        topPosition: 0,
        ishidden: true
      }) 
    }
  }
})
