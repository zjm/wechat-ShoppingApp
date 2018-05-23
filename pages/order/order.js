// pages/order/order.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js");
var app = getApp();
var that;
var pointData = {
  sum: 1000,
  canUse: 100,
  isUse: false
};
var userData = {
  balance: 1000
}
Page({
  data: {
    oldTotalMoney: 0,
    showAddr: false,
    showAddAddr: true,
    totalMoney: 0,   // 合计金额
    date: "",

    // 发票信息 
    invoice: [
      {
        id: 0,
        name: '不要发票'
      },
      {
        id: 1,
        name: '纸质发票--个人'
      },
      {
        id: 2,
        name: '纸质发票--企业'
      },
      {
        id: 3,
        name: '电子发票--个人'
      },
      {
        id: 4,
        name: '电子发票--企业'
      }
    ],
    // 积分信息
    point: {
      sum: pointData.sum,
      canUse: pointData.canUse,
      offMoney: parseInt(pointData.canUse / 100),
      isUse: pointData.isUse
    },
    // 个人余额
    user: {
      balance: userData.balance
    },
    clientHeight: "100%",
    overflow: "auto",
    isSelected: true, //优惠券默认选中不使用
    isChecked: false,  //默认不选择余额支付
    id: -1,  // 优惠券栏默认显示不使用
    offLast: 0  //上个折扣值
  },
  onShow() {
    that = this;
    wx.getStorage({
      key: 'orderData',
      success: function (res) {
        console.log(res.data);
        var len = res.data.length;
        var total = 0;
        for (var i = 0; i < len; i++) {
          total += res.data[i].num * res.data[i].price;
        }
        that.setData({
          totalMoney: total,
          detail: res.data
        })

      }
    })
  },
  // 获取地址
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          showAddAddr: false,
          showAddr: true,
          name: res.userName,
          addrdetail: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          tel: res.telNumber
        })
      },
    })
  },
  onLoad() {
    for (var i in listData.ticketData) {
      listData.ticketData[i].checked = false;
    }

    console.log(listData.ticketData)
    this.setData({
      ticketData: listData.ticketData
    })
  },
  // 日期选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 发票选择
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },


  // 积分按钮
  pointUseTap: function () {
    var isUse = this.data.point.isUse;
    isUse = !isUse;
    this.setData({
      point: {
        sum: pointData.sum,
        canUse: pointData.canUse,
        offMoney: parseInt(pointData.canUse / 100),
        isUse: isUse
      }
    })

    // 判断是否选中，选中则优惠，未选中还原
    if (isUse) {
      var money = this.data.totalMoney - this.data.point.offMoney;
      this.setData({
        totalMoney: money
      })
    }
    else {
      var money = this.data.totalMoney + this.data.point.offMoney;
      this.setData({
        totalMoney: money
      })
    }
  },

  // 余额按钮
  balanceTap: function () {
    var check = this.data.isChecked;
    check = !check;
    this.setData({
      isChecked: check
    })
  },



  // 优惠券栏点击
  ticketTap: function () {
    if (this.data.isShow) {
      this.hideLayer();
    }
    else {
      this.showLayer();
    }
  },


  // 
  // ticketItemTap: function (e) {
  //   var id = e.currentTarget.dataset.id;
  //   this.setData({
  //     id: id
  //   })
  //   var nowMoney = this.data.totalMoney;
  //   var oldMoney = this.data.oldTotalMoney;
  //   for (var i in listData.ticketData){
  //     if (id == listData.ticketData[i].id && this.data.totalMoney > listData.ticketData[i].goal) {
  //       if (listData.ticketData[i].checked) {
  //         break;
  //       }
  //       var money = oldMoney - listData.ticketData[i].off;
  //       this.setData({
  //         // ticketData: listData.ticketData,
  //         totalMoney: money
  //       })
  //       listData.ticketData[i].checked = true;
  //       break;
  //     }
  //     else {
  //       listData.ticketData[i].checked = false;
  //       var money = nowMoney + listData.ticketData[i].off;
  //       this.setData({
  //         // ticketData:listData.ticketData,
  //         totalMoney: nowMoney
  //       })
  //     }
  //   }

  //   console.log('radio发生change事件，携带checked值为：', e)
  //   // this.hideLayer();
  // },


  // radio切换事件触发时，如果自定义的id=原数据自带的id，说明点中了当前radio
  // 开for循环，把所有的cheked改为false，当前点击的radio的checked值设为true
  ticketItemTap: function (e) {
    // radio选中清零
    for (var i in listData.ticketData) {
      listData.ticketData[i].checked = false;
    }
    // 页面显示优惠券选择状态
    var id = parseInt(e.detail.value);
    this.setData({
      id: id
    })

    // 获取之前的折扣值 
    var offLast = this.data.offLast;

    var nowMoney = this.data.totalMoney;


    // 点击切换到不使用时
    if (id == -1) {
      // radio选中清零
      for (var i in listData.ticketData) {
        listData.ticketData[i].checked = false;
      }


      // 合计金额还原 
      var money = nowMoney + offLast;
      offLast = 0;
      this.setData({
        ticketData: listData.ticketData,
        offLast: offLast,
        totalMoney: money
      })
    }

    for (var i in listData.ticketData) {
      if (id == listData.ticketData[i].id) {
        // radio当前选中
        listData.ticketData[i].checked = true;

        // 先加上上次的折扣值，还原为点击优惠券前的总金额
        var money = nowMoney + offLast;

        // 记录当前点击的优惠券折扣值
        offLast = listData.ticketData[i].off;
        // 折扣后的总金额
        money = money - listData.ticketData[i].off;

        this.setData({
          ticketData: listData.ticketData,
          offLast: offLast,
          totalMoney: money
        })
        break;
      }

    }

    // console.log('radio发生change事件，携带value值为：', e)
    this.hideLayer();
  },





  showLayer: function () {
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease-out",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      isShow: true,
      // 禁止背景滚动
      clientHeight: "100%",
      overflow: "hidden"
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50)
  },

  hideLayer: function () {
    // 隐藏遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        isShow: false,
        // 恢复背景滚动
        clientHeight: "100%",
        overflow: "auto"
      })
    }.bind(this), 200)
  },


  placeOrder: function (event) {
    if (this.data.showAddAddr) {
      utils.showTip("请填写收货地址", "loading");
      return false;
    }
    // 发起支付
    var orderDetail = this.data.detail;
    var userInfo = { name: this.data.name, tel: this.data.tel, addrdetail: this.data.addrdetail };
    var totalPrice = this.data.totalMoney;
    var remarks = event.detail.value.remark;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openId = res.data;
        if (!openId) {
          console.log('未获取到openId请刷新重试');
          return false;
        }



        //传参数金额，名称，描述,openid
        Bmob.Pay.wechatPay(totalPrice, '小程序商城', '描述', openId).then(function (resp) {

          //服务端返回成功
          var timeStamp = resp.timestamp,
            nonceStr = resp.noncestr,
            packages = resp.package,
            orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
            sign = resp.sign;
          //发起支付
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': packages,
            'signType': 'MD5',
            'paySign': sign,
            'success': function (res) {
              //付款成功,这里可以写你的业务代码
              var User = Bmob.Object.extend("_User");
              var currentUser = Bmob.User.current();
              var objectid = currentUser.id;
              var Order = Bmob.Object.extend("Order");
              var Order = new Order();
              var me = new Bmob.User();
              me.id = objectid;
              Order.set("remarks", remarks);
              Order.set("orderUser", me);
              Order.set("totalprice", parseFloat(totalPrice));
              Order.set("orderDetail", orderDetail);
              Order.set("orderId", orderId);
              Order.set("status", 1);
              Order.set("userInfo", userInfo);
              Order.save(null, {
                success: function (result) {
                  wx.redirectTo({
                    url: '../order/index'
                  })
                },
                error: function (result, error) {

                }
              });
            },
            'fail': function (res) {
              console.log(res)
              var User = Bmob.Object.extend("_User");
              var currentUser = Bmob.User.current();
              var objectid = currentUser.id;
              var Order = Bmob.Object.extend("Order");
              var Order = new Order();
              var me = new Bmob.User();
              me.id = objectid;
              Order.set("remarks", remarks);
              Order.set("orderUser", me);
              Order.set("totalprice", parseInt(totalPrice));
              Order.set("orderDetail", orderDetail);
              Order.set("status", 0);
              Order.set("userInfo", userInfo);
              Order.set("orderId", orderId);
              Order.save(null, {
                success: function (result) {
                  console.log(result.id)
                },
                error: function (result, error) {

                }
              });
            }
          })

        }, function (err) {
          console.log('服务端返回失败');
          console.log(err);
        });

      }
    })
  }

});