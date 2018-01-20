//index.js
//获取应用实例
const app = getApp();
const AV = require('../../lib/av-weapp-min.js')
var Teacher = require('../../lib/teacherClass.js');
Page({

  data: {
    courseList:{}, // 课程列表的数据;

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 跳转到个人介绍页面
  introduce: function(event) {
    // 
    var id = event.currentTarget.dataset.objectid;
    console.log(id);
    var url = '../person/person?id=' + id;
    console.log(url);
    // 跳转到对应的url 详情界面中 可以预约这门课程：
    // 预约的时候 需要检测这个当前用户的一些个人信息：

    wx.navigateTo({
      url: url
    })
    //console.log('---objectid' + JSON.stringify(var id = event.currentTarget.dataset.id))
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 去获取所有的index 数据：
    // leancloud 开始检测当前用户的状况;

    AV.User.loginWithWeapp().then(user => {
       // 设置当前的信息为这个user；
       //将当前这个用户的信息放在这个里面：
      app.globalData.user = user.toJSON();
       // 
    }).catch(console.error);

    var teacher = new Teacher();
    let promise = teacher.getTeacherCourseList();
    promise.then(res=> {
      wx.hideLoading();
      console.log(res);
      this.setData({
        courseList: res
      });
    }, error=> {
      wx.hideLoading();
      console.log(error);
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      
    })
  }
})
