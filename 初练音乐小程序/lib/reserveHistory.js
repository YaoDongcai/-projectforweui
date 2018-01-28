
// 这里是所有Teacher教程里面的数据
const AV = require('../lib/av-weapp-min.js');
class ReserveHistory {
  constructor() {

  }

  // 获取当前的历史消息
  getHistoryByUserName(userName) {
    var query = new AV.Query('TeacherReserve');
    

    query.equalTo('userName', userName);
    wx.showLoading({
      title: '正在加载',
      mask: true
    });

    var promise = query.find();
    return promise;
  }
}

module.exports = ReserveHistory;
