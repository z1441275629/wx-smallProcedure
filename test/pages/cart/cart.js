// pages/cart/cart.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    total:0
  },
  plus:function(e){
    //console.log(idx);
    var idx = e.target.dataset.idx;
    var numnew = ++this.data.goods[idx].goodscount;
    var goodscount = "goods["+idx+"].goodscount";
    this.setData({ [goodscount]:numnew});
    this.total();
  },
  decrease:function(e){
    //console.log(e.target.dataset.idx);
    var idx = e.target.dataset.idx;
    var numnew = --this.data.goods[idx].goodscount;
    var goodscount = "goods[" + idx + "].goodscount";
    if(numnew<=0){
      numnew=1;
    }else{
      this.setData({ [goodscount]: numnew });
    }
    this.total();
  },
  delete1:function(e){
    var idx=e.target.dataset.idx;
    var del="goods["+ idx +"].del";
    var check="goods["+idx+"].check";
    // console.log(this.data.goods[idx].del)
    this.setData({[del]:!this.data.goods[idx].del,[check]:false});
    console.log(del);
    this.total();
  },
  isChecked:function(e){
    var idx=e.target.dataset.idx;
    var check="goods["+idx+"].check";
    this.setData({[check]: !this.data.goods[idx].check });
    this.total();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.vipName);
    if (!app.globalData.vipName) {
      wx.switchTab({
        url: '/pages/login/login',
      })
    } else {
      wx.switchTab({
        url: './../cart/cart',
      });
    }
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
    console.log(app.globalData.vipName);
    if (!app.globalData.vipName) {
      wx.switchTab({
        url: '/pages/login/login',
      })
    } else {
      wx.switchTab({
        url: './../cart/cart',
      });
      var that = this;
      console.log(app.globalData.vipName);
      wx.request({
        url: 'http://10.100.106.113/fenqile/PHP/getVipGoods.php',
        data: {
          vipName: app.globalData.vipName
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            goods: res.data
          });
          let goodsInfo;
          for (let i = 0; i < res.data.length; i++) {
            // console.log(i);
            wx.request({
              url: "http://10.100.106.113/fenqile/PHP/getTheGood.php",
              data: {
                id: res.data[i].goodsid
              },
              success: function (res) {
                // console.log(i);
                goodsInfo = "goods[" + i + "].goodsInfo";

                that.setData({
                  [goodsInfo]: res.data
                });
                var del = "goods[" + i + "].del";
                var check = "goods[" + i + "].check";
                that.setData({
                  [del]: true,
                  [check]: false
                })
              }
            })
          }
        }
      })
    }
    // var that=this
    // setTimeout(function(){
    //   console.log(that.data.goods)
    // },3000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏");
    var goods=this.data.goods;
    for(let i=0;i<goods.length;i++){
      if(goods[i].del==false){
          wx.request({
            url: "http://10.100.106.113/fenqile/PHP/deleteGood.php",
            data:{
              vip:app.globalData.vipName,
              goodsId:goods[i].goodsid
            },
            success:function(res){
              console.log(res.data);
            }
          })
      };
      for (let i = 0; i < goods.length; i++) {
         //if (goods[i].del == false) {
          wx.request({
            url: "http://10.100.106.113/fenqile/PHP/updateCart.php",
            data: {
              id: goods[i].goodsid,
              vipName: app.globalData.vipName,
              count: goods[i].goodscount
            },
            success: function (res) {
              console.log(res.data);
            }
          })
         };
     //}
    }
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
  total:function(){
    var sum=0;
    var goods = this.data.goods;
    for(var i=0;i<goods.length;i++){
      if(goods[i].check){
        sum += goods[i].goodscount * goods[i].goodsInfo.nowprice;
      }
    }
    this.setData({
      total:sum
    });
    // wx.navigateTo({
    //   url: './../liebiao/liebiao',
    // })
  }
})