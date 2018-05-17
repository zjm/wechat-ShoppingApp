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




module.exports = {
  formatTime: formatTime,
  showTip: showTip,
  showModal: showModal
}
