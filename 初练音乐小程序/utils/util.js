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

function istel(tel) {
  var rtn = false;
  //移动号段  
  var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
  if (regtel.test(tel)) {
    rtn = true;
  }
  //电信号段  
  regtel = /^((133)|(153)|(18[0|1|9])|(177))[\d]{8}$/;
  if (regtel.test(tel)) {
    rtn = true;
  }
  //联通号段  
  regtel = /^((13[0-2])|(145)|(15[5-6])|(176)|(18[5-6]))[\d]{8}$/;
  if (regtel.test(tel)) {
    rtn = true;
  }
  return rtn;
}
module.exports = {
  formatTime: formatTime,
  request: request,
  istel: istel
}
