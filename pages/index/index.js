//index.js
var listData = require('../../data/test-data.js')
console.log(listData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},

    // 判断标题title是否被修改过
    isTitle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    });

    

    this.setData({
      menuList: listData.menuList,
      goodsItem: listData.goodsItem
    });
    
  },


// 一级列表点击事件
  changeClass: function (e) {
    

    // this.animation.rotate(180).step()

    var isChecked = e.currentTarget.dataset.isChecked;
    // console.log(isChecked);

    // for (var i = 0; i < initSubMenuDisplay.length; i++) {
    //   if (i == index) {
    //     if (this.data.subMenuDisplay[index] == "show") {
    //       initSubMenuDisplay[index] = 'hidden'
    //     } else {
    //       initSubMenuDisplay[index] = 'show'
    //     }
    //   } else {
    //     initSubMenuDisplay[i] = 'hidden'
    //   }
    // }  

    if (isChecked==true){
      this.setData({
        num: e.currentTarget.dataset.num,
        isChecked : false
      })
    } else{
      this.setData({
        num: e.currentTarget.dataset.num,
        listId: -1,
        isChecked: true
      })
    }
 
    


    // this.setData({
    //   num: e.currentTarget.dataset.num,
    //   isChecked: true
    //   // animationData: this.animation.export()
    // })
  },

  // 二级列表点击事件
  changeClass2 : function(e){
    // var titleName = listData.menuList[][];

    this.setData({
      listId: e.target.dataset.listId,
      goodsTitle: e.target.dataset.name,
      isTitle: true
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
