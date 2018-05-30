//index.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");

console.log(listData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断标题title是否被修改过
    isTitle:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: "0"
    // })
    this.animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    });
    this.setData({
      navList: listData.navList,
      menuList: listData.menuList,
      goodsItem: listData.goodsItem,
      bannerList: listData.bannerList
    });
  },
  toAddr : function(){
    wx.navigateTo({
      url: '../location/location',
    })
  },
scanTap:function(){
  wx.scanCode({
    success: (res) => {
      console.log(res)
    }
  })
},


// 一级列表点击事件
  changeClass: function (e) {
    

    // this.animation.rotate(180).step()

    // var isChecked = e.currentTarget.dataset.isChecked;
    // console.log(isChecked);

    var idx = e.currentTarget.dataset.num;


    // 给一级菜单添加自定义属性isChecked；
    for (var i in listData.menuList) {
      var Item = listData.menuList[i];
      if(Item.listId == idx){
        Item.isChecked = !Item.isChecked;
      }
      else{
        Item.isChecked = false;
      }

    }

      this.setData({
        num: e.currentTarget.dataset.num,
        menuList: listData.menuList,
        listId : -1
      })
 
    
  },

  // 二级列表点击事件
  changeClass2 : function(e){
    // var listId = e.target.dataset.listId;
    // console.log(listId)
    // for (var i in listData.menuList) {
    //   // 给二级菜单添加自定义属性isSelected；
    //   for (var j in listData.menuList[i].item) {
    //     var item = listData.menuList[i].item[j];
    //     if (item.ID == listId) {
    //       item.isSelected = !item.isSelected;
    //     }
    //     else {
    //       item.isSelected = false;
    //     }
    //     console.log(item)
    //   }
    // }
    this.setData({
      listId: e.target.dataset.listId,
      goodsTitle: e.target.dataset.name,
      isTitle: true
      // menuList: listData.menuList
    })


  },
// 商品点击
  goodsItemTap: function (event){

    var goodsId = event.currentTarget.dataset.goodsId;
    wx.navigateTo({
      // 此时?后面的id为其他页面接收时参数后的变量名
      url: "../detail/detail?id=" + goodsId
    })
    console.log(goodsId)
  },

// 广告条点击
  onSwiperTap: function (event) {

    var numId = event.target.dataset.num;
    wx.navigateTo({
      url: "../detail/detail?id=" + numId
    })
    console.log(numId)
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
    utils.cartNum();
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
