// pages/category/childCpn/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event) {
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("menuChange",{index:index},{})
    }
  }
})
