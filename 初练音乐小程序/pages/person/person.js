
var Teacher = require('../../lib/teacherClass.js');
var TeacherReserve = require('../../lib/teacherReserveClass.js');
var app = getApp(); // 获取当前的app
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详细消息
    objectId:null, //当前用户的信息id
    person: {},  // 当前这个教师的信息;
    user: null, // 当前用户的信息：
    inputValue: null,
    showModal: false,
  },
  inputChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
    * 弹窗
    */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
       * 弹出框蒙层截断touchmove事件
       */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    // 获取当前填的数字号码
    

    // 如果当前的数字不符合电话的标准，那么就提示用户当前的信息有错误;
    let phone = this.data.inputValue ;
    if (util.istel(phone)) {
      this.hideModal();
      // 开始提交数据到后台 我们开始立即预约当前的用户;
      // 需要准备的数据：1 ： 当前用户的userid
      //                2 : 当前用户提交的预约号码
      //                3:  当前用户的objectID
      //                4: 预约后的课程的
      var user = app.globalData.user;
      var teacherReserve = new TeacherReserve();
      teacherReserve.reserveTeacherByUserName(
        this.data.objectId,
        phone,
        user.username
      ).then(function(res) {
      // 提示用户发送成功：
      wx.hideLoading();
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      });

      }, function(error) {
        // 提示用户发送错误
        console.log(error)
      });


    }
    else {
      // 提示用户当前的数据有问题 请从新输入;
      let message = "号码不对";
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });

    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 开始去请求数据；
    // 请求成功 则把当前的数据开始设置为person;
    let id = options.id;
    this.setData({
      objectId: id
    });
    var teacher = new Teacher();
    teacher.getTeacherByObjectId(id).then(res => {
      wx.hideLoading();
      this.setData({
        person: res
      });

    },error=> {
      wx.hideLoading();
    })

  },
  // 立即预约

  deposit() {
    // 这个时候开始跳一个框子出来；
    var _self = this;
    wx.showModal({
      title: '预约我们',
      content: `
      <view class="section">
  <input placeholder="输入手机号码" auto-focus/>
</view>
      `,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})