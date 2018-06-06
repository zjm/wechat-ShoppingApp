// pages/orderlist/orderlist.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,//当前所在滑块的 index
    navlist: ["全部", "待付款", "待收货", "已完成", "已取消"],
    conlist: []
  },
  //tab切换
  tab: function (event) {
    this.setData({
      selected: event.target.dataset.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var conlist = this.data.conlist;
    var orderList = listData.orderList;

    var waitPay = []; //成为会员
    var waitRec = []; //已注册
    var complete = []; //未注册
    var cancle = []; //未注册
    

    for (var i in orderList) {
      switch (true) {
        case orderList[i].status == "待付款":
          waitPay.push(orderList[i]);
          break;

        case orderList[i].status == "待收货":
          waitRec.push(orderList[i]);
          break;
        case orderList[i].status == "已完成":
          complete.push(orderList[i]);
          break;
        case orderList[i].status == "已取消":
          cancle.push(orderList[i]);
          break;
        default: ;
      }

    }
    conlist.push(orderList);
    conlist.push(waitPay);    
    conlist.push(waitRec);
    conlist.push(complete);
    conlist.push(cancle);

    console.log(conlist)


    this.setData({
      conlist: conlist
    })
  },

  deleteTap:function(e){
    var that = this;
    var conlist = this.data.conlist;
    var id = e.currentTarget.dataset.id;
    var index = this.data.selected;
    wx.showModal({
      title: '提示',
      content: '确认删除此订单吗？',
      success: function (res) {
        if (res.confirm) {
          var newConlist = conlist[index].splice(id,1);
          that.setData({
            conlist: conlist
          })
          // console.log(newConlist)
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