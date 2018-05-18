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


module.exports = {
  formatTime: formatTime,
  showTip: showTip,
  showModal: showModal,
  cartNum: cartNum
}
