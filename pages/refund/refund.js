// pages/refund/refund.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();

// var sourceType = [['camera'], ['album'], ['camera', 'album']]
// var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    // 退货理由 
    reason: [
      {
        id: 0,
        name: '7天无理由退换货'
      },
      {
        id: 1,
        name: '型号/参数等与商品描述不符'
      },
      {
        id: 2,
        name: '质量问题'
      },
      {
        id: 3,
        name: '少件/漏发'
      },
      {
        id: 4,
        name: '包装/商品破损'
      },
      {
        id: 5,
        name: '假冒品牌'
      }
    ],
  },
  // sourceTypeChange: function (e) {
  //   this.setData({
  //     sourceTypeIndex: e.detail.value
  //   })
  // },
  // sizeTypeChange: function (e) {
  //   this.setData({
  //     sizeTypeIndex: e.detail.value
  //   })
  // },
  // countChange: function (e) {
  //   this.setData({
  //     countIndex: e.detail.value
  //   })
  // },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      // sourceType: sourceType[this.data.sourceTypeIndex],
      // sizeType: sizeType[this.data.sizeTypeIndex],
      // count: this.data.count[this.data.countIndex],
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  // 退货理由选择
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  inputChange:function(e){
    var length = e.detail.value.length;
    this.setData({
      inputLength:length
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var refundGoods = listData.refundGoods;
    var sumPrice = 0;
    for(var i in refundGoods){
      sumPrice += parseInt(refundGoods[i].price);
    }
    this.setData({
      refundGoods:refundGoods,
      price:sumPrice
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