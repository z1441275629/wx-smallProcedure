// pages/login/login.js
//获取应用实例
const app = getApp()

Page({
  log(){
    //console.log(typeof this.data.msg.userName);//string
    //先判断用户名和密码是否已经输入
    if ((this.data.msg.userName.length > 0) && (this.data.msg.userPass.length > 0)){
      //请求后台
      console.log("success");
      var that = this;
      wx.request({
        url: "http://10.100.106.113/fenqile/PHP/log.php",
        data:{
          tel:that.data.msg.userName,
          pass:that.data.msg.userPass
        },
        method:"POST",
        header:{
          "content-type" : "application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log(res.data);
          if (res.data==1){
            //登陆成功，保存到storage，跳转到首页

            wx.setStorage({
              key: 'userName',
              data: that.data.msg.userName
            });
            wx.switchTab({
              url: '/pages/index/index'
            });
          }else{//账号或密码错误
            that.setData({
              TF: true,
              warn: "账号或密码错误！"
            });
            setTimeout(function () {
              that.setData({
                TF: false
              });
            }, 1000);
          }
        }
      })

    }else{
      console.log("error");
      this.setData({
        TF:true,
        warn:"请输入用户名或密码！"
      });
      var that = this;
      setTimeout(function(){
        that.setData({
          TF:false
        });
      }, 1000);
    }
  },
  uname(e){
    var userName="msg.userName";
    this.setData({
        [userName]:e.detail.value
    });
  },
  upass(e){
    var userPass = "msg.userPass";
    this.setData({
      [userPass]: e.detail.value
    });
  },
  hide(){
    this.setData({
      TF:false
    });
  },
  reg(){
    wx.navigateTo({
      url: '/pages/reg/reg'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    msg:{
      userName:"",
      userPass:""
    },
    hasUser:false,
    TF:false,
    warn:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if(app.globalData.vipName){
      this.setData({
        hasUser: app.globalData.vipName
      });
    }else{
      this.setData({
        hasUser: undefined
      });
    }
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
  
  },
  exit(){
    wx.clearStorage();
    app.globalData.vipName="";
    this.setData({
      hasUser:undefined
    });
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
})