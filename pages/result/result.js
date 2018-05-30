// pages/result/result.js
var listData = require('../../data/test-data.js');
var utils = require("../../utils/util.js")
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    characteristicList: [{
      text: "免配送费"
    }, {
      text: "0元起送"
    }, {
      text: "新商家"
    }, {
      text: "品牌商家"
    }, {
      text: "跨天预定"
    }],
    sortList: [{
      sort: "综合排序",
      image: "",
    }, {
      sort: "速度最快",
      image: "",
    }, {
      sort: "评分最高",
      image: "",
    }, {
      sort: "起送价最低",
      image: "",
    }, {
      sort: "配送费最低",
      image: "",
    }],
    discountList: [{
      icon: "减",
      iconColor: "#FF635B",
      text: "满减优惠"
    }, {
      icon: "领",
      iconColor: "#FF7298",
      text: "进店领券"
    }, {
      icon: "返",
      iconColor: "#FB4343",
      text: "满返代金券"
    }, {
      icon: "折",
      iconColor: "#C183E2",
      text: "折扣商品"
    }, {
      icon: "订",
      iconColor: "#6FDF64",
      text: "提前下单优惠"
    }, {
      icon: "赠",
      iconColor: "#FDC41E",
      text: "满赠活动"
    }, {
      icon: "免",
      iconColor: "#43B697",
      text: "满免配送"
    }],
    categoryList: {
      pageone: [{
        name: "美食",
        src: "/pages/images/1.png"
      }, {
        name: "甜点饮品",
        src: "/pages/images/2.png"
      }, {
        name: "美团超市",
        src: "/pages/images/3.png"
      }, {
        name: "正餐精选",
        src: "/pages/images/4.png"
      }, {
        name: "生鲜果蔬",
        src: "/pages/images/5.png"
      }, {
        name: "全部商家",
        src: "/pages/images/6.png"
      }, {
        name: "免配送费",
        src: "/pages/images/7.png"
      }, {
        name: "新商家",
        src: "/pages/images/8.png"
      }],
      pagetwo: [{
        name: "美食",
        src: "/pages/images/1.png"
      }, {
        name: "甜点饮品",
        src: "/pages/images/2.png"
      }, {
        name: "美团超市",
        src: "/pages/images/3.png"
      }, {
        name: "正餐精选",
        src: "/pages/images/4.png"
      }, {
        name: "生鲜果蔬",
        src: "/pages/images/5.png"
      }, {
        name: "全部商家",
        src: "/pages/images/6.png"
      }, {
        name: "免配送费",
        src: "/pages/images/7.png"
      }, {
        name: "新商家",
        src: "/pages/images/8.png"
      }]
    },
    selected: 0, //菜单item选中
    active:0, //下拉菜单item选中
    scrollTop:0, //滚动条滚动距离
    animationData: "",
    location: "",
    characteristicSelected: [false, false, false, false, false, false, false],
    discountSelected: null,
    selectedNumb: 0,
    sortSelected: "综合排序",
    isShow: false,
    clientHeight: "auto",
    overflow: "auto",
    inpData: {
      inputVal: "", // 搜索的内容
      isDisabled: true,
      isSwitch: false  //模板内的isSwitch
    },
    isSwitch: false //本页面内的isSwitch
  },
  finish: function () {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/filter",
      method: "GET",
      success: function (res) {
        that.setData({
          restaurant: res.data.data.restaurant,
        })
      }
    });
  },
  
  clearSelectedNumb: function () {
    this.setData({
      characteristicSelected: [false],
      discountSelected: null,
      selectedNumb: 0
    })
  },
  characteristicSelected: function (e) {
    var info = this.data.characteristicSelected;
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index];
    this.setData({
      characteristicSelected: info,
      selectedNumb: this.data.selectedNumb + (info[e.currentTarget.dataset.index] ? 1 : -1)
    })
    console.log(e.currentTarget.dataset.index);
  },
  discountSelected: function (e) {
    if (this.data.discountSelected != e.currentTarget.dataset.index) {
      this.setData({
        discountSelected: e.currentTarget.dataset.index,
        selectedNumb: this.data.selectedNumb + (this.data.discountSelected == null ? 1 : 0)
      })
    } else {
      this.setData({
        discountSelected: null,
        selectedNumb: this.data.selectedNumb - 1
      })
    }
  },
  onTapTag: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    });
  },
  mask1Cancel: function () {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel: function () {
    this.setData({
      mask2Hidden: true
    })
  },

// 排序下拉菜单显示
  onOverallTag: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index,
      isShow2: true,
      // 禁止背景滚动
      clientHeight: "100%",
      overflow: "hidden"
    })
  },
  // 下拉菜单子项选中
  sortSelected: function (e) {
    var that = this;
    var active = e.currentTarget.dataset.index;
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/overAll",
    //   method: "GET",
    //   success: function (res) {
        that.setData({
          // restaurant: res.data.data.restaurant,
          isShow2: false,
          sortSelected: that.data.sortList[e.currentTarget.dataset.index].sort,
          active: active
    //     })
    //   }
    });
  },
  
  // 滚动到一定位置
  onPageScroll: function (res) {
    this.setData({
      scrollTop: res.scrollTop
    })
    console.log(res.scrollTop)
  },
  preventMove:function(){
// 利用catchtouchmove阻止背景滚动 不用添加任何代码
// 只适合模态层不需要滚动的场景
  },

  // 隐藏层滑入
  showLayer: function () {
    var that = this;
    utils.showLayer(that, "translateX", 500, 75);
  },

  // 隐藏层滑出
  hideLayer: function () {
    var that = this;
    utils.hideLayer(that, "translateX", 500);

    this.setData({
      isShow2:false
    })
  },

  // 列表展示切换
  switchTap: function(){
    var isSwitch = this.data.isSwitch;
    isSwitch = !isSwitch;
    this.setData({
      isSwitch: isSwitch,
      inpData: {
        isSwitch: isSwitch,
        isDisabled: true
      }
    })
  },
// 结果页的该函数是返回搜索页面
  searchLogShowed: function(e){
    var value = e.detail.value;
    wx.navigateBack({
      delta:1
    })
    // wx.redirectTo({
    //   url: '../search/search?value=' + value
    // })
  },

  // 商品点击
  goodsItemTap: function (event) {
    var goodsId = event.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: "../detail/detail?id=" + goodsId
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = options.value;
      this.setData({
        goodsItem: listData.goodsItem,
        inpData: {
          inputVal: value,
          isDisabled: true
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
    // var that = this;
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/info",
    //   method: "GET",
    //   success: function (res) {
    //     that.setData({
    //       restaurant: res.data.data.restaurant,
    //       location: wx.getStorageSync('location')
    //     })
    //   }
    // });
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