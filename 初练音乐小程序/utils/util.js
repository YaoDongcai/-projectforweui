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
// 统一的request调用：
function request(url, data={}, method= 'GET') {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {},
      method: method,
      dataType: json,
      responseType: text,
      success: function(res) {
        console.log('werequest success' + url)
        if(res.statusCode == 200) {
            // 返回数据成功;
            resolve(res)
        }
      },
      fail: function(res) {
        // 表示失败：
        console.log('werequest error' + url);
        console.log(res);
        reject(res);
      },
      complete: function(res) {},
    })
  })
}
module.exports = {
  formatTime: formatTime,
  request: request
}
