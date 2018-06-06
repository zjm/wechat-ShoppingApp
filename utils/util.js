const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示消息提示框
function showTip(info, icon, fun, time) {
  if (!time) {
    time = 1500;
  }
  wx.showToast({
    title: info,
    icon: icon,
    duration: time,
    success: fun
  })
}

// ​显示模态弹窗
function showModal(c, t, f, fun) {
  if (!t)
    t = '提示'
  wx.showModal({
    title: t,
    content: c,
    showCancel: f,
    success: fun
  })
}

function cartNum(){
  // 动态改变购物车内的商品数量
  // 注意同步与异步的区别，点击事件内进行时，购物车如果使用异步进行数据更新，此时的num可能还是未更新前的值
  // 本程序只需在几个位置添加此事件，首页和购物车页onShow时，购物车内的商品被删除时
  var num = wx.getStorageSync("cartData").length;
  wx.setTabBarBadge({
    index: 2,
    text: num.toString()
  })
}

function showLayer(that,attr,start,end) {
  // 隐藏层滑入  
  // that --  动画作用对象
  // attr --  动画属性 主要做位移动画
  // start -- 初始位置
  // end --  结束位置
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "ease-out",
    delay: 0
  })
  that.animation = animation

  // 动画创建时元素的初始位置，translate Y轴正数代表下移距离，0代表元素底边刚好与屏幕底边重合
  animation[attr](start).step()
  that.setData({
    animationData: animation.export(),
    isShow: true,
    // 禁止背景滚动
    clientHeight: "100%",
    overflow: "hidden"
  })
  // 隐藏层第二步动画,从初始位置移动到指定位置
  setTimeout(function () {
    animation[attr](end).step()
    that.setData({
      animationData: animation.export()
    })
  }.bind(that),100)
}

function hideLayer(that, attr, start) {
  // 隐藏层滑出
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  that.animation = animation

  // 滑出时，start的位置就是目标位置
  animation[attr](start).step()
  that.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    // animation[attr](end).step()
    that.setData({
      animationData: animation.export(),
      isShow: false,
      // 恢复背景滚动
      clientHeight: "100%",
      overflow: "auto"
    })
  }.bind(that), 200)
}


module.exports = {
  formatTime: formatTime,
  showTip: showTip,
  showModal: showModal,
  cartNum: cartNum,
  showLayer: showLayer,
  hideLayer: hideLayer
}
