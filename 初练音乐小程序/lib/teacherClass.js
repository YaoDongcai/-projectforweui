// 这里是所有Teacher教程里面的数据
const AV = require('../lib/av-weapp-min.js');
class TeacherClass {
    constructor() {
      //
      console.log('Teacher Class construct');
    }
    // 获取当前的老师详情信息
    getTeacherByObjectId(id) {
      var query = new AV.Query('Teacher');
      wx.showLoading({
        title: '正在加载',
        mask: true
      });

      var promise = query.get(id);
      return promise;

    }
    // 获取所有的课程list 列表  这个是我们的推荐老师部分：
    getTeacherCourseList() {
        var query = new AV.Query('Teacher');
        wx.showLoading({
          title: '正在加载',
          mask:true
        });

        var promise = query.find();
        return promise;
    }
}

module.exports = TeacherClass;
