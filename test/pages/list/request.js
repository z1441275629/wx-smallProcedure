// pages/request/request.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    // var goods=this.data.goods;
    wx.request({
      url: 'http://10.100.106.113/fenqile/PHP/getGoods.php',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.data);
        that.setData({ goods:res.data});
        // console.log(that.data.goods);
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
  
  },
  request: function(){
    wx.request({
      // url: 'http://10.100.106.113/fenqile/PHP/getGoods.php', //接口地址
      url: 'http://10.100.106.113/fenqile/PHP/reg.php',
      method: "POST",
      data: {
        tel: '45645656456',
        pass: 'SDFASDFDSF'
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorage({
          key: 'goodsid',
          data: res.data,
          
        })
        wx.getStorage({
          key: 'goodsid',
          success: function(res) {
            console.log(res.data);
          },
        })
        //wx.clearStorage("goodsid")
      }
    })
  },
  goToDetail:function(event){ 
    var id = event.currentTarget.dataset.id;   
    wx.navigateTo({
      url: "./../detail/detail?id="+id+""
    })
  }
})