// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    sex: "male",
    telNum: "",
    codeNum: "",
    hasTime: false, //是否倒计时状态
    radio: [
      {
        name: '先生',
        value: 'male',
        checked: true,
      },
      {
        name: '女士',
        value: 'female',
      },
    ],
  },

  radioChange: function (e) {
    var radio = this.data.radio;
    for (var i in radio) {
      radio[i].checked = radio[i].value == e.detail.value;
    }

    this.setData({
      sex: e.detail.value,
      radio: radio
    })
    
  },

  countDownTap:function(){
    this.countDown();
  },

// 倒计时
  countDown: function () {
    var that = this;
    // 两位数补全
    function toTwo(num) {
      return num > 9 ? num : "0" + num;
    };

    

 // 如果还在倒计时中 点击无效
    if (this.data.hasTime) {
      return false;
    }

// 获取缓存中的倒计时，0或不存在就默认60S
    var num = parseInt(wx.getStorageSync("countDown")) || 60;

// 定时器在页面隐藏时只要没满足条件仍然在执行
    var timer = setInterval(function () {
      num--;
      that.setData({
        countDown: toTwo(num),
        hasTime: true
      })
      // 缓存记录倒计时状态和倒计时数值
      wx.setStorageSync("hasCount", true);
      wx.setStorageSync("countDown", num);

      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          hasTime: false,
        })
        wx.setStorageSync("hasCount", false);
        wx.setStorageSync("countDown", 0);
      }

    }, 1000)






  },




  saveTap: function () {
    this.setData({

    })
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
    // 页面显示时，如果还在倒计时状态，继续执行没完成的倒计时
    if (wx.getStorageSync("hasCount")){
      this.countDown();
    }
    
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