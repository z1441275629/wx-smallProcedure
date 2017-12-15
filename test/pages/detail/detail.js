// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{
      id:null,
      theGoods:null
    },
    toView: 'green',
    scrollTop: 100,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    get fixedToTwo(){
      //console.log(e);
      return 2;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //console.log(app.globalData);
    console.log(app.globalData.vipName);

    //option是传递过来的参数
    console.log(option)
    var id=option.id;
    var that=this;
    console.log(id)
    var dataid="msg.id"
    this.setData({[dataid]:id})
    wx.request({
      url: 'http://10.100.106.113/fenqile/PHP/getTheGood.php',
      method:'GET',
      data:{
        id:id
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        var theGoods = "msg.theGoods"        
        console.log(res)
        that.setData({
          [theGoods]:res.data
        });
        console.log(that.data.msg.theGoods)
      }
    })

    //获取缓存数据，并存入data中
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
    // console.log(this.data.msg.theGoods)
   
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
  joinCart:function(){
    console.log(app.globalData.vipName);
    if (!app.globalData.vipName) {
      wx.switchTab({
        url: '/pages/login/login',
      })
    }else{ 
      wx.switchTab({
        url: './../cart/cart',
      });
      var that=this
      wx.request({
        url: 'http://10.100.106.113/fenqile/PHP/addToShopCar.php',
        method:"GET",
        data:{
          vipName: app.globalData.vipName,
          count:"1",
          id:that.data.msg.id
        },
        success:function(res){
          console.log(res.data)
        }

      })
    }
  }
})