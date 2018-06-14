// pages/recharge/recharge.js
var utils = require("../../utils/util.js");

var app = getApp();
var getMoney = 0;  //实际到账金额
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPoint: false,
    inputValue: "",
    payWay: ["微信零钱", "银行卡"],
    bank: [
      {
        id: 0,
        name: '中国农业银行'
      },
      {
        id: 1,
        name: '中国银行'
      },
      {
        id: 2,
        name: '中国建设银行'
      },
      {
        id: 3,
        name: '招商银行'
      },
      {
        id: 4,
        name: '中国工商银行'
      },
      {
        id: 5,
        name: '中国光大银行'
      },
      {
        id: 6,
        name: '中国邮政储蓄银行'
      }
    ],
  },

  inputMoney: function (e) {
    var inputMoney = parseInt(e.detail.value);
    if (inputMoney > getMoney) {
      this.setData({
        inputValue: getMoney
      })
    }
  },
  // 提现方式选择
  payWayChange: function (e) {
    this.setData({
      payWayIndex: e.detail.value
    })
  },

  // 银行选择
  bankChange: function (e) {
    this.setData({
      bankId: e.detail.value
    })
  },

  //  提现按钮
  requestPayment: function (e) {
    console.log(e.detail.value)
    var withdrawData = e.detail.value;
    if (withdrawData.paymoney == null || withdrawData.paymoney == "") {
      utils.showTopTips(this, "请输入提现金额")
      return false
    }
    if (withdrawData.payWay == null || withdrawData.payWay == "") {
      utils.showTopTips(this, "请选择提现方式")
      return false
    }
    if (withdrawData.payWay == 1 && withdrawData.bank == null || withdrawData.bank == "") {
      utils.showTopTips(this, "请选择银行")
      return false
    }
    if (withdrawData.payWay == 1 && withdrawData.cardNum == null || withdrawData.cardNum == "") {
      utils.showTopTips(this, "请输入银行卡号")
      return false
    }
    if (withdrawData.payWay == 1 && withdrawData.cardUser == null || withdrawData.cardUser == "") {
      utils.showTopTips(this, "请输入持卡人")
      return false
    }

    utils.showTopTips(this, "提交成功")

  },
  helpTap: function () {
    wx.showModal({
      title: '说明',
      content: '100积分可以提现1元',
      showCancel: false
    })
  },

  allInp: function () {

    this.setData({
      inputValue: getMoney
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果是积分提取页，获得的金额为积分兑换金额
    var point = options.point;
    var getPointCanUse = Math.round(point / 100);
    if (point != null && point != "") {
      this.setData({
        isPoint: true,
        pointCanUse: point,
        getPointCanUse: getPointCanUse
      })
    }

    // 如果是余额提取页,获得的金额就是余额
    var balance = options.balance;
    var getBalance = balance;
    if (balance != null && balance != "") {
      this.setData({
        isPoint: false,
        balance: balance,
        getBalance: getBalance
      })
    }


    if (this.data.isPoint) {
      getMoney = this.data.getPointCanUse
    }
    else {
      getMoney = this.data.getBalance
    }

    this.initValidate();

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