// pages/detail/detail.js
var listData = require('../../data/test-data.js');
var Quantity = require('../template/cart-input/cart-input-template.js');
var utils = require("../../utils/util.js")
var app = getApp();



Page(Object.assign({}, Quantity, {

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: [{
      text: "商品描述",
      id: 0
    },
    {
      text: "商品属性",
      id: 1
    },
    {
      text: "售后服务",
      id: 2
    }],
    isShow: false,
    actionType: "payOrder",
    Quantity: {
      quantity: 1,
      min: 1,
      max: 9999
    },
    clientHeight: "100%",
    overflow: "auto",
    list: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // option接收其他页面传递过来的值，?后面的变量名id
    var num = options.id;
    var goodsItem = listData.goodsItem[num];
    this.setData({
      goodsItem: goodsItem,
      num: 0,
      price: goodsItem.price
    })
  },
  /*查看图片*/
  viewImg: function (e) {
    var src = e.currentTarget.dataset.src;
    console.log(src)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  // 导航条点击
  navTap: function (e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },

// 隐藏层滑入
  showLayer: function () {
    var that = this;
    utils.showLayer(that, "translateY", 300,0);
  },

// 隐藏层滑出
  hideLayer: function () {
    var that = this;
    utils.hideLayer(that, "translateY", 500);
  },


  buyTap: function (event) {
    // 根据按钮不同区分“下一步”触发的事件
    var name = event.target.dataset.name;
    if (name == "order") {
      this.setData({
        actionType: 'payOrder'
      })
    }
    else if (name == "cart") {
      this.setData({
        actionType: 'addCart'
      })
    }
    if (this.data.isShow) {
      this.hideLayer();
    }
    else {
      this.showLayer();
    }
  },
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.setData({
      [`${componentId}.quantity`]: quantity,
      price: (this.data.goodsItem.price * quantity).toFixed(2)

    });
  },

  // 加入购物车触发事件
  addCart: function () {
    //获取数量，价格，商品名称，id，封面图
    var num = this.data.Quantity.quantity;
    var price = this.data.goodsItem.price;
    var id = this.data.goodsItem.id;
    var title = this.data.goodsItem.title;
    var img = this.data.goodsItem.coverImg;

    // 库存判断
    // var remNum = this.data.goodsItem.remNum;
    // if (parseInt(number) > parseInt(remNum)) {
    //   utils.showModal("货存不足！");
    //   return false;
    // }

    var cartData = [];
    var detailArr = { num: num, price: price, id: id, title: title, coverImg: img, active: true };
    var oldCartData = [];
    oldCartData = wx.getStorageSync('cartData');
    // 如果缓存没有购物车数据，新建，已存在时，把新数据push到旧数据
    if (!oldCartData) {
      cartData.push(detailArr);
      wx.setStorage({
        key: "cartData",
        data: cartData
      })
    }
    else {

      oldCartData.push(detailArr);

      // 遍历缓存，查看是否存在id相等的同一商品，有就进行数量合并
      for (var i = 0; i < oldCartData.length; i++) {
        for (var j = i + 1; j < oldCartData.length; j++) {
          if (oldCartData[i].id == oldCartData[j].id) {
            oldCartData[i].num += oldCartData[j].num;
            oldCartData.splice(j, 1);
          }
        }
        oldCartData[i].num > 9999 ? oldCartData[i].num = 9999 : oldCartData[i].num
        // console.log(oldCartData);
      }

      wx.setStorage({
        key: "cartData",
        data: oldCartData
      })
    }

    // // 获取购物车的商品数量，保存到缓存中
    // var num = wx.getStorageSync("cartData").length;
    // wx.setStorage({
    //   key: "cartNum",
    //   data: num
    // });



    this.hideLayer();
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading();
      utils.showTip("添加成功！");
    }, 1000)

  },
  // 立即购买触发事件
  payOrder: function () {
    //获取数量，价格，商品名称，id，封面图
    var num = this.data.Quantity.quantity;
    var price = this.data.goodsItem.price;
    var id = this.data.goodsItem.id;
    var title = this.data.goodsItem.title;
    var img = this.data.goodsItem.coverImg;
    // 库存判断
    // var remNum = this.data.goodsItem.remNum;
    // if (parseInt(number) > parseInt(remNum)) {
    //   utils.showModal("货存不足！");
    //   return false;
    // }
    var detailArr = [];
    detailArr = { num: num, price: price, id: id, title: title, coverImg: img };
    var orderData = [];
    orderData.push(detailArr);
    // 保存在缓存中
    wx.setStorage({
      key: "orderData",
      data: orderData
    });
    wx.navigateTo({
      url: '../order/order'
    });
    this.hideLayer();
  },


  goCart: function () {
    wx.switchTab({
      url: '../cart/cart'
    });
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

  }




}))