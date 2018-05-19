// pages/cart/cart.js
var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {
      edit: true,  //是否显示编辑
      totalPrice: 0,  // 总价
      allSelect: true,  // 全选状态
      noSelect: false,  // 非全选状态
      list: []    // 购物车缓存数据
    },
    delBtnWidth: 140,    //删除按钮宽度（rpx）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initEleWidth();
    this.onShow();

  },


  /**
   * 生命周期函数--监听页面显示，每次显示刷新购物车数据
   */
  onShow: function () {
    // var shopList = [];
    // 获取购物车缓存数据
    var cartInfo = wx.getStorageSync('cartData');
    this.data.goodsList.list = cartInfo;
    console.log(cartInfo)
    // 数据更新到页面
    this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), cartInfo);

    utils.cartNum();
  },
  toIndexPage: function () {
    wx.navigateTo({
      url: "../shop/index"
    });

  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  // 按住开始
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  // 按住移动
  touchM: function (e) {
    var index = e.currentTarget.dataset.index;

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 50) {//如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 50) {//移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      var list = this.data.goodsList.list;
      if (index != "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },
  // 按住结束
  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      var list = this.data.goodsList.list;
      if (index !== "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

      }
    }
  },

  // 每个元素的单独删除事件
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    list.splice(index, 1);
    this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    utils.cartNum();
  },
  // 每个元素的单独选择事件
  selectTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      list[parseInt(index)].active = !list[parseInt(index)].active;
      this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },

  // 数量加
  jiaBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].num < 9999) {
        list[parseInt(index)].num++;
        this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },
  // 数量减
  jianBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].num > 1) {
        list[parseInt(index)].num--;
        this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },
  // 数量输入
  inputNum: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      list[parseInt(index)].num = parseInt(e.detail.value);
      if (e.detail.value >= 9999) {
        list[parseInt(index)].num = 9999;
      }
      if (e.detail.value <= 1) {
        list[parseInt(index)].num = 1;
      }
      this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

    }
  },
  inp: function () {
    console.log("(*^▽^*)");
  },


  // 删除选中
  deleteSelected: function () {
    var list = this.data.goodsList.list;
    for (var i in list) {
      var cartItem = list[i];
      // 对购物车进行遍历，如果当前是选中状态，删除当前元素
      if (cartItem.active) {
        list.splice(i--, 1);
      }
    }
    this.setGoodsList(this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    utils.cartNum();


  },

  // 提交订单
  toPayOrder: function () {
    if (this.data.goodsList.noSelect) {
      utils.showTip("请至少选择一件商品！", "none");
      return;
    }
    wx.showLoading();
    // 重新计算价格，判断库存
    var shopList = [];
    var cartInfo = wx.getStorageSync('cartData');
    shopList = cartInfo;
    if (shopList.length == 0) {
      utils.showTip("请至少选择一件商品！", "none");
      return;
    }
    var orderData = new Array();
    for (var i = 0; i < shopList.length; i++) {
      //把选择的放进订单存储中
      if (shopList[i].active) {
        //判断库存
        // if (shopList[i].good_number < shopList[i].number) {
        //   utils.showTip(shopList[i].name + "商品库存不足", "loading");
        //   return;
        // } 
        // else {
        orderData.push(shopList[i]);
        // }
      }
    }
    wx.setStorage({
      key: "orderData",
      data: orderData
    })
    this.clear();
  },
  //清除提交订单时选中的购物车商品缓存
  clear: function () {

    // wx.removeStorageSync('cartData')
    var cartArr = wx.getStorageSync("cartData");
    var newArr = [];
    for (var i in cartArr) {
      if (!cartArr[i].active) {
        newArr.push(cartArr[i]);
      }
    }
    wx.setStorage({
      key: 'cartData',
      data: newArr
    })

    wx.hideLoading();
    wx.navigateTo({
      url: '../order/order'
    })
  },

  // 计算总价
  totalPrice: function () {
    var list = this.data.goodsList.list;
    var total = 0;
    for (var i in list) {
      var cartItem = list[i];
      if (cartItem.active) {
        total += parseFloat(cartItem.price) * cartItem.num;
      }
    }
    return total.toFixed(2);
  },
  // 是否全选状态
  allSelect: function () {
    var list = this.data.goodsList.list;
    var allSelect = false;
    for (var i in list) {
      var cartItem = list[i];
      if (cartItem.active) {
        allSelect = true;
      }
      else {
        allSelect = false;
        // 只要有一个没选中，跳出循环
        break;
      }
    }
    return allSelect;
  },
  // 是否全不选状态
  noSelect: function () {
    var list = this.data.goodsList.list;
    var noSelect = 0;
    for (var i in list) {
      var cartItem = list[i];
      if (!cartItem.active) {
        noSelect++;
      }
    }
    // 如果没选中的个数=购物车列表总数，说明全不选状态，返回true
    if (noSelect == list.length) {
      return true;
    }
    else {
      return false;
    }
  },

  // 全选，全不选事件
  bindAllSelect: function () {
    var currentAllSelect = this.data.goodsList.allSelect;
    var list = this.data.goodsList.list;
    //  全不选
    if (currentAllSelect) {
      for (var i in list) {
        var cartItem = list[i];
        cartItem.active = false;
      }
    }
    // 全选
    else {
      for (var i in list) {
        var cartItem = list[i];
        cartItem.active = true;
      }
    }
    // 更新各种状态
    this.setGoodsList(this.getEdit(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
  },
  // 编辑按钮点击
  editTap: function () {
    var list = this.data.goodsList.list;
    // 清除全选状态
    for (var i = 0; i < list.length; i++) {
      var cartItem = list[i];
      cartItem.active = false;
    }
    this.setGoodsList(!this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  // 完成按钮点击
  saveTap: function () {
    var list = this.data.goodsList.list;
    // 恢复全选状态
    for (var i = 0; i < list.length; i++) {
      var cartItem = list[i];
      cartItem.active = true;
    }
    this.setGoodsList(!this.getEdit(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  // 获得edit按钮的状态
  getEdit: function () {
    var edit = this.data.goodsList.edit;
    return edit;
  },
  // 更新各种状态的值
  setGoodsList: function (edit, total, allSelect, noSelect, list) {
    this.setData({
      goodsList: {
        edit: edit,
        totalPrice: total,
        allSelect: allSelect,
        noSelect: noSelect,
        list: list
      }
    });
    // var shopCarInfo = {};
    // wx.setStorage({
    //   key: "cartData",
    //   data: list
    // })

    // 改为同步，方便购物车数据刷新
    wx.setStorageSync("cartData", list);
  }

})