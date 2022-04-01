// views/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: "",
    nickname: "",
    jifen: 0,
    lianxuday: 0,
    sumday: 0,
    sumcount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userimg: userInfo.avatarUrl,
        nickname: userInfo.nickName
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  reset:function(){
    wx.showModal({
      title: '提示',
      content: '确认删除数据，初始化小程序',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorageSync("lishi");
          wx.showToast({
            title: '已重置',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //授权
  onGotUserInfo: function(e) {
    console.log(e);
    var that = this;
    var userInfo = e.detail.userInfo;
    if (!wx.getStorageSync('userInfo')) {
      app.globalData.userInfo = userInfo;
      that.setData({
        userimg: userInfo.avatarUrl,
        nickname: userInfo.nickName
      })
      wx.setStorageSync('userInfo', userInfo);
    }
  },
  //检查更新
  reloadTap:function()
  {
    let hs =  wx.canIUse('getUpdateManager');
    if (!hs){
        wx.showToast({
          icon: "none",
          title: '微信版本过低,请升级至新版',
        });return ;
    }
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
      if (!res.hasUpdate){
        wx.showToast({
          icon:"none",
          title: '当前已经是最新版',
        }); return;
      }
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  //授权设置
  getOuth_tap:function(e)
  {
     wx.openSetting({
       
     })
  }
})