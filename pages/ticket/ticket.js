// pages/ticket/ticket.js

var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,//当前所在tab的 index
    navlist: ["未使用", "使用记录", "已过期"],
    conlist:[],
    statusClass: ["ticket-unused", "ticket-used-history", "ticket-used"]
  },
  //tab切换
  tab: function (event) {
    this.setData({
      selected: event.target.dataset.current,

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var conlist = this.data.conlist;
    var ticketList = listData.ticketData;


    var unused = []; //未使用
    var used = []; //使用记录
    var overdue = [] //已过期

    for (var i in ticketList) {
      switch (true) {
        case ticketList[i].status == "未使用":
          unused.push(ticketList[i]);
          break;

        case ticketList[i].status == "已使用":
          used.push(ticketList[i]);
          break;
        case ticketList[i].status == "已过期":
          overdue.push(ticketList[i]);
          break;
        default: ;
      }

    }
    
    conlist.push(unused);
    conlist.push(used);
    conlist.push(overdue);


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