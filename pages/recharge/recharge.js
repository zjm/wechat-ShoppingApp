// pages/recharge/recharge.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },


  requestPayment: function (e) {
    console.log(e.detail.value)
    // var self = this

    // self.setData({
    //   loading: true
    // })
    // // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    // app.getUserOpenId(function (err, openid) {
    //   if (!err) {
    //     wx.request({
    //       url: "https://14592619.qcloud.la/payment",
    //       data: {
    //         openid
    //       },
    //       method: 'POST',
    //       success: function (res) {
    //         console.log('unified order success, response is:', res)
    //         var payargs = res.data.payargs
    //         wx.requestPayment({
    //           timeStamp: payargs.timeStamp,
    //           nonceStr: payargs.nonceStr,
    //           package: payargs.package,
    //           signType: payargs.signType,
    //           paySign: payargs.paySign
    //         })

    //         self.setData({
    //           loading: false
    //         })
    //       }
    //     })
    //   } else {
    //     console.log('err:', err)
    //     self.setData({
    //       loading: false
    //     })
    //   }
    // })




    // function wxpay(app, money, orderId, redirectUrl) {
    //   let remark = "在线充值";
    //   let nextAction = {};
    //   if (orderId != 0) {
    //     remark = "支付订单 ：" + orderId;
    //     nextAction = { type: 0, id: orderId };
    //   }
    //   wx.request({
    //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/pay/wxapp/get-pay-data',
    //     data: {
    //       token: wx.getStorageSync('token'),
    //       money: money,
    //       remark: remark,
    //       payName: "在线支付",
    //       nextAction: nextAction
    //     },
    //     //method:'POST',
    //     success: function (res) {
    //       if (res.data.code == 0) {
    //         // 发起支付
    //         wx.requestPayment({
    //           timeStamp: res.data.data.timeStamp,
    //           nonceStr: res.data.data.nonceStr,
    //           package: 'prepay_id=' + res.data.data.prepayId,
    //           signType: 'MD5',
    //           paySign: res.data.data.sign,
    //           fail: function (aaa) {
    //             wx.showToast({ title: '支付失败:' + aaa })
    //           },
    //           success: function () {
    //             wx.showToast({ title: '支付成功' })
    //             wx.redirectTo({
    //               url: redirectUrl
    //             });
    //           }
    //         })
    //       } else {
    //         wx.showToast({ title: '服务器忙' + res.data.code + res.data.msg })
    //       }
    //     }
    //   })
    // }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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