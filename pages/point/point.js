// pages/point/point.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: false,
    notUsed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.sum) {
      var sum = options.sum;
    }
    else {
      var sum = false;
    }

    if (options.notUsed) {
      var notUsed = options.notUsed;
    }
    else {
      var notUsed = false;
    }

    this.setData({
      sum: sum,
      notUsed: notUsed,
      pointData: listData.pointData
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

  showHelp: function () {
    wx.showModal({
      title: '说明',
      content: '积分可用于支付，100积分=1元（积分支付不得超过每笔订单结算金额的50%）。积分可以通过购物等活动获得。',
      // cancelText:"关闭",
      showCancel: false,
      confirmText: "我知道了",

      // success: function (res) {
      //   if (res.confirm) {
      //     console.log('用户点击确定')
      //   } else if (res.cancel) {
      //     console.log('用户点击取消')
      //   }
      // }
    })
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