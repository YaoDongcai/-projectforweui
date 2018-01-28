// 这里是所有Teacher教程里面的数据
const AV = require('../lib/av-weapp-min.js');
// 预约老师的课程表格
class TeacherReserve {
  //
  constructor() {
    // 构造函数
  }

  reserveTeacherByUserName(
    teacherID,// 老师的信息
    userPhone,//用户输入的电话号码
    userName // 用户的id 
  ) {

    // 声明类型
    var Todo = AV.Object.extend('TeacherReserve');
    // 新建对象
    var item = new Todo();
    wx.showLoading({
      title: '正在提交',
      mask: true
    });
    
    // 设置名称
    item.set('teacherID', teacherID);
    // 设置优先级
    item.set('userPhone', userPhone);
    item.set('userName', userName);

    var promise = item.save();
    return promise;
  }
}

module.exports = TeacherReserve;