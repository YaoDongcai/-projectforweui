var Teacher = require('../../lib/teacherClass.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详细消息
    person: {},
    showModal: false,
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
    this.hideModal();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 开始去请求数据；
    // 请求成功 则把当前的数据开始设置为person;
    let id = options.id;

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