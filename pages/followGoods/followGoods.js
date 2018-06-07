// pages/followGoods/followGoods.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var followGoods = listData.followGoods;
    this.setData({
      followGoods:followGoods
    })
  },

  cancelFollow:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(e)
    wx.showModal({
      title: '',
      content: '确定要取消关注吗?',
      success: function (res) {
        if (res.confirm) {
          var followGoods = listData.followGoods;
          followGoods.splice(index,1);
          that.setData({
            followGoods: followGoods
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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