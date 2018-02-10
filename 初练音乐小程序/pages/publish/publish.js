//logs.js
const util = require('../../utils/util.js')
var File = require('../../lib/File.js');
Page({
  data: {
    logo: null, // 封面图片地址
    
  },
  onLoad: function () {
    
  },
  // 发布这个课程
  publishCourse: function(e) {
        console.log( 'img_url' + JSON.stringify(e.detail))
        console.log( 'name' + e.detail.value.name)
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
        console.log(res);
        var tempFilePath = res.tempFilePaths[0];
          _this.setData({
            logo: tempFilePath
          })

        // var promise = (new File()).uploadImageAndGetUrl(tempFilePath);
        // promise.then(function(res2) {
        //   _this.setData({
        //     logo: res2
        //   })
        // }, function(error) {

        // } )
        
      }
    })
  }
})
