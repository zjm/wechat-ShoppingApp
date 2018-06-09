// pages/setting/setting.js

var inpTelNum = ""; //记录输入的手机号码
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
    showTopTips: false,  //是否显示顶部提示
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

  countDownTap: function () {
    this.countDown();
  },

  // 倒计时
  countDown: function () {
    var that = this;
    // 两位数补全
    function toTwo(num) {
      return num > 9 ? num : "0" + num;
    };

// 先检查手机号是否正确
    // this.tips(inpTelNum);
    // if (!this.tips(inpTelNum)){
    //   return false;
    // }

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

  // 手机号输入
  inputTel: function (e) {
    // console.log(e.detail.value + ":::")
    inpTelNum = e.detail.value;
    console.log(inpTelNum)
    // inpTelNum[telNum] = inpTelNum;
    // console.log(inpTelNum[telNum])
   
  },

  // 错误提示框显示与隐藏
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  // 错误类别判断
  tips: function(data){
    if (data.nickName == null || data.nickName == ""){
       this.setData({
        errorTips:"姓名或昵称不能为空"
      });
       this.showTopTips();
       return false;
    }

    if(data.telNum==""){
      this.setData({
        errorTips: "请输入正确的手机号"
      });
      this.showTopTips();
      return false;
    }
    if (data.codeNum == "") {
       this.setData({
        errorTips: "验证码错误"
      });
       this.showTopTips();
      return false;
    }
    else {
      return true;
    }
  },

  // tips: {
   
  //   name: function (data) {
  //     if (data.nickName == null || data.nickName == "") {
  //       this.setData({
  //         errorTips: "姓名或昵称不能为空"
  //       });
  //       this.showTopTips();
  //       return false;
  //     }
  //   },
  //   tel: function (data) {
  //     if (data.telNum == "") {
  //       this.setData({
  //         errorTips: "请输入正确的手机号"
  //       });
  //       this.showTopTips();
  //       return false;
  //     } else{
  //       return true;
  //     }
  //   },

  //   code: function (data) {
  //     if (data.codeNum == "") {
  //       this.setData({
  //         errorTips: "验证码错误"
  //       });
  //       this.showTopTips();
  //       return false;
  //     }
  //   }
  // },



  // 保存提交
  submitForm: function (e) {
    this.tips(e.detail.value);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
    if (wx.getStorageSync("hasCount")) {
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