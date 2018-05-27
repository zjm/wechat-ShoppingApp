// pages/follow/follow.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();



Page({

  /**
   * 页面的初始数据  "内容1", "内容2", "内容3", "内容4"
   */
  data: {
    selected: 0,//当前所在tab的 index
    navlist: ["全部", "成为会员", "已注册", "未注册"],
    conlist: []
  },
  //tab切换
  tab: function (event) {
    this.setData({
      selected: event.target.dataset.current
    })

  },
  //点击事件
  eventchange: function (event) {
    this.setData({
      selected: event.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var conlist = this.data.conlist;
    var storeList = listData.storeList;


    var vip = []; //成为会员
    var reg = []; //已注册
    var unreg = [] //未注册

    for (var i in storeList) {
      switch (true) {
        case storeList[i].classify == 0:
          vip.push(storeList[i]);
          break;

        case storeList[i].classify == 1:
          reg.push(storeList[i]);
          break;
        case storeList[i].classify == 2:
          unreg.push(storeList[i]);
          break;
        default: ;
      }

    }
    conlist.push(storeList);
    conlist.push(vip);
    conlist.push(reg);
    conlist.push(unreg);


    console.log(conlist);


    this.setData({
      conlist: conlist
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