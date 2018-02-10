//logs.js
const util = require('../../utils/util.js')
var TeacherPublishCourse = require('../../lib/teacherReserveClass.js');
var app = getApp(); // 获取当前的app
var File = require('../../lib/File.js');
Page({
  data: {
    logo: null, // 封面图片地址
    
  },
  onLoad: function () {
    
  },
  // 发布这个课程
  publishCourse: function(e) {
       
        console.log( 'name' + e.detail.value.name);
        console.log('img' + this.data.logo);
        var user = app.globalData.user;
        var img_url = '';
        var course = {
          name:'',
          cost:'',
          time:'',
          description:'',
          address:''
        };

        course.name = e.detail.value.name;
        course.cost = e.detail.value.cost;
        course.time = e.detail.value.time;
        course.description = e.detail.value.description;
        course.address = e.detail.value.address;
        var self = this;
        var teacherPublishCourse = new TeacherPublishCourse();
        teacherPublishCourse.publishCourse(
          self.data.logo,
          user.username,
          course
        ).then(function (res) {
          // 提示用户发送成功：
          wx.hideLoading();
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
          });
        }, function (error) {

        })
        // 将数据存储到对应的表中
 
       
  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
          _this.setData({
            logo: tempFilePath
          })

          var promise = (new File()).uploadImageAndGetUrl(_this.data.logo);
          promise.then(function (file) {
            console.log(JSON.stringify(file))
            _this.setData({
              logo: file
            })
          }, function (error) {

          })
        
      }
    })
  }
})
