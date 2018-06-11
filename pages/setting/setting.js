// pages/setting/setting.js
import WxValidate from '../../src/WxValidate.js'


var inpTelNum = ""; //记录输入的手机号码
var getCodeNum = "1234"; //记录后台返回的验证码
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      // sex: e.detail.value,
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
    if (!/^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(inpTelNum)) {
      this.showTopTips("请输入正确的手机号")
      return false
    }

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
    inpTelNum = e.detail.value;
  },

  // 错误提示框显示与隐藏
  showTopTips: function (msg) {
    var that = this;
    this.setData({
      showTopTips: true,
      errorTips:msg
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  // 错误类别判断
  // tips: function (data) {
  //   if (data.nickName == null || data.nickName == "") {
  //     this.setData({
  //       errorTips: "姓名或昵称不能为空"
  //     });
  //     this.showTopTips();
  //     return false;
  //   }

  //   if (data.telNum == "") {
  //     this.setData({
  //       errorTips: "请输入正确的手机号"
  //     });
  //     this.showTopTips();
  //     return false;
  //   }
  //   if (data.codeNum == "") {
  //     this.setData({
  //       errorTips: "验证码错误"
  //     });
  //     this.showTopTips();
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // },

  // 初始化验证信息
  initValidate() {
    
    this.WxValidate = new WxValidate(
      // 验证通过时
      // 值的命名需要与form表单内的各个name名相同，value值就是name内的值
      {
        nickName: {
          required: true, //必填
          nickName: true, //自定义验证条件
        },
        telNum: {
          required: true,
          tel: true,
        },
        codeNum: {
          required: true,
          codeNum: true,
        }
      },
      // 验证不通过时
      {
        nickName: {
          required: '请输入姓名或昵称'
        },
        telNum: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
        },
        codeNum: {
          required: '请输入验证码'
        }
      })

    // 自定义验证方法
    this.WxValidate.addMethod('nickName', (value, param) => {
      // 不能为空 输入的值不能带有空格
      // console.log(this.WxValidate.optional(value))
      return this.WxValidate.optional(value) || !(/\s+/.test(value))
    }, '请输入正确的姓名或昵称'),
      this.WxValidate.addMethod('codeNum', (value, param) => {
        // 不能为空 输入的值需要和后台返回的验证码相等
        return this.WxValidate.optional(value) || (value == getCodeNum)
      }, '请输入正确的验证码')

  },


  // 保存提交
  submitForm: function (e) {
    // this.tips(e.detail.value);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)


    
    if (!this.WxValidate.checkForm(e)) {
      var error = this.WxValidate.errorList[0]
      console.log(error)
      this.showTopTips(error.msg)
      return false
    }

    // $wuxToptips.success({
    //   hidden: !0,
    //   text: '提交成功',
    // })
    this.showTopTips("成功")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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