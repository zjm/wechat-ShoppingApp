//classify.js
var listData = require('../../data/test-data.js');

Page({
  data: {
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    var id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  onLoad: function(){
    
    

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })

    var cateItems = [];
    var windowHeight = 0;
    var res = wx.getSystemInfoSync();
    var that = this;
    this.setData({
      // 可使用窗口高度-状态栏的高度
      windowHeight: res.windowHeight - res.statusBarHeight,
      cateItems : listData.categoryData
    })
    console.log(this.data.windowHeight)
  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
