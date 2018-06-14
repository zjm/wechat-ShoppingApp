// pages/search/search.js
var app = getApp();
var searchTitle = ""; // 搜索关键字  


Page({
  data: {
    searchHotList: ["ICC", "ABC", "TGS", "YHU", "WTG", "FKI", "JHR", "EW5"],
    searchLogList: [], // 存储搜索历史记录信息  
    inpData: {
      inputVal: "", // 搜索的内容
      isDisabled: false,
      isFocus: true
    },
    // inputVal: "321",
    isShowHot: true
    

  },
  onLoad: function (options) {

  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
    this.searchLogShowed();
    // this.setData({
    //   inpData: {
    //     inputVal: searchTitle, // 搜索的内容
    //     isFocus: true
    //   },
    // })
  },


  // 显示搜索输入框和搜索历史记录  
  showInput: function () {
    var that = this;

    that.setData({
      searchLogList: wx.getStorageSync('searchLog')
    });

  },

  // 显示搜索历史记录  
  searchLogShowed: function () {
    var that = this;
    if ("" != wx.getStorageSync('searchLog')) {
      that.setData({
        searchLogList: wx.getStorageSync('searchLog')
      });
    }
  },

  // 点击 搜索 按钮后 隐藏搜索记录，并加载数据  
  searchData: function () {
    var that = this;
  // 判断输入值是否有空格 去空格
    if (/\s+/.test(searchTitle)){
      searchTitle = searchTitle.replace(/\s+/g, "");
    }

    // 搜索后将搜索记录缓存到本地  
    if ("" != searchTitle) {
      var searchLogData = that.data.searchLogList;

      // 检查历史记录是否有重复
      var oldData = wx.getStorageSync('searchLog');
      var n = 0;
      for (var i in oldData) {
        if (oldData[i] != searchTitle) {
          n++;
        }
      }
      // 没有重复时，n=原历史记录数据个数，添加新查询数据
      if (n == oldData.length) {
        searchLogData.push(searchTitle);
      }
      
      wx.setStorageSync('searchLog', searchLogData);
    }

    that.searchLogShowed();
    wx.navigateTo({
      url: '../result/result?value='+searchTitle,
    })
    console.log("搜索事件" + searchTitle)
  },

// 键盘搜索按钮点击事件
  searchBtn: function (e) {
    console.log('发生了键盘搜索事件，携带数据为：', e.detail.value)
    this.searchData();
  },

  // 点击叉叉icon 清除输入内容  
  clearInput: function () {
    var that = this;
    searchTitle = "";
    that.setData({
      inpData: {
        inputVal: ""
      }
    });
  },

  // 输入内容时 把当前内容赋值给 查询的关键字，并显示搜索记录  
  inputTyping: function (e) {
    var that = this;
    // 如果不做这个if判断，会导致 searchLogList 的数据类型由 list 变为 字符串  
    if ("" != wx.getStorageSync('searchLog')) {
      that.setData({
        inpData: {
          inputVal: e.detail.value
        },
        searchLogList: wx.getStorageSync('searchLog')
      });
    }

    that.setData({
      inpData: {
        inputVal: e.detail.value
      }
    })
    searchTitle = e.detail.value;

  },

  // 通过搜索记录查询数据  
  searchDataByLog: function (e) {
    // 从view中获取值，在view标签中定义data-name(name自定义，比如view中是data-log="123" ; 那么e.target.dataset.log=123)  
    searchTitle = e.target.dataset.log;
    var that = this;
    that.setData({
      inpData: {
        inputVal: searchTitle
      }
    });
    this.searchData();
  },
  // 清楚搜索记录  
  clearSearchLog: function () {
    var that = this;
    wx.showModal({
      title: '',
      content: '确认删除全部历史记录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync("searchLog");
          that.setData({
            searchLogList: []
          });
        }
      }
    })

  },

  isShow: function () {
    var isShowHot = this.data.isShowHot;
    isShowHot = !isShowHot;
    this.setData({
      isShowHot: isShowHot
    })
  },
  onHide: function () {
    // 页面隐藏  
    // this.setData({
    //   inpData: {
    //     inputVal: searchTitle, // 搜索的内容
    //     isFocus: false
    //   },
    // })
  },
  onUnload: function () {
    // 页面关闭  
  }
})  