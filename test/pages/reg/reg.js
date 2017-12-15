// pages/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{
      userName:"",
      userPass:"",
      nameState:false,
      passState:false
    },

    TF:false,
    warn:""
  },
  uname(e){
    //console.log(e);
    var userName="msg.userName";
    this.setData({
      [userName]:e.detail.value
    });
  },
  upass(e){
      var userpass="msg.userPass";
      this.setData({
        [userpass]:e.detail.value
      });
  },
  checkName(){
    //1.验证手机号
    //正则验证
    var that = this;
    var reg = /^1[34578]\d{9}$/gi;
    var uname = this.data.msg.userName;
    var nameState = "msg.nameState";
    var res = reg.test(uname);
    if (!res) {
      this.setData({
        TF: true,
        [nameState]:false,
        warn: "手机号格式或长度不正确！"
      });
      setTimeout(function () {
        that.setData({
          TF: false
        });
      }, 2000);
    } else {//正则验证通过
      //查询手机号是否已经注册
      this.setData({
        [nameState]: true
      });
      //后台查询是否已经注册该用户名
      wx.request({
        url:"http://10.100.106.113/fenqile/PHP/regTel.php",
        data:{
          tel:that.data.msg.userName
        },
        success(res){
          console.log(res);
          var nameState = 'msg.nameState';
          if(res.data==1){
            //用户名已被注册
            that.setData({
              TF: true,
              [nameState]: false,
              warn: "该用户名已被注册！"
            });
            setTimeout(function () {
              that.setData({
                TF: false
              });
            }, 2000);

          }else if(res.data==0){
            //可以注册
            console.log("恭喜，该用户名可以注册！");
            that.setData({
              [nameState]:true
            });
          }
        }
      });
    }
  },
  checkPass(){
    //2.验证密码强度
    //var regPass=//gi;
    var that=this;
    var upass = this.data.msg.userPass;
    var passState = "msg.passState";
    if (upass.length >= 6 && upass.length <= 12) {
      this.setData({
        [passState]: true
      });
    } else {
      this.setData({
        TF: true,
        [passState]: false,
        warn: "密码长度应为6-12位！"
      });
      setTimeout(function () {
        that.setData({
          TF: false
        })
      }, 2000);

    }
    
    
  },
  reg(){
    var that=this;
    //各项检查都通过后，向后台发送数据
    if (this.data.msg.nameState == true && this.data.msg.passState == true ){
      //验证通过，向后台发送数据
      console.log("验证初步通过，即将请求后台");
      wx.request({
        url: "http://10.100.106.113/fenqile/PHP/reg.php",
        method:"POST",
        data:{
          tel:that.data.msg.userName,
          pass:that.data.msg.userPass
        },
        header:{
          "content-type" : "application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log(res);
          if(res.data==1){
              console.log("注册成功！");
              wx.navigateTo({
                url: '/pages/login/login',
              })
          }else{
              console.log("注册失败!");
          }

        }
      })

    }else{
      this.setData({
        TF: true,
        warn: "信息有错误，请检查一下再注册"
      });
      var that = this;
      setTimeout(function(){
        that.setData({
          TF: false
         // warn: "信息有错误，请检查一下再注册"
        });
      },2000);
    }
  },
  hide() {
    this.setData({
      TF: false
    });
  },
  log(){
    wx.switchTab({
      url: '/pages/login/login'
    })
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