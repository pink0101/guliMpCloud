//index.js
//获取应用实例
const app = getApp()
let store = require('./../../utils/store.js')
let Api = app.Api;
let router = app.router;
Page({
  data: {
    userId:store.getItem('userId')
  },
  onLoad: function () {
    this.getOpenId();
  },
  // 获取 openId
  getOpenId(){
    // 调用云函数
    wx.cloud.callFunction({
      name:'getOpenId',// 调用云函数的名称
      data:{ // 传递给云函数的参数
        name:'jack'
      },
      success:res=>{
        console.log('云函数[getOpenId]调用成功'+JSON.stringify(res))
      },
      fail:res=>{
        console.log('云函数[getOpenId]调用失败' + JSON.stringify(res))
      }
    });
  },
  // 微信登录
  getUserInfo(e){
    // 第一步获取用户信息
    let user = e.detail.userInfo;
    // 第二部调用小程序云函数
    wx.cloud.callFunction({
      name:'login',
      data:{
        user
      },
      success:res => {
        store.setItem('userId',res.result.userId);// 进行存储
        this.setData({ // 存储
          userId: res.result.userId
        })
      },
      fail:res=>{
        console.log('云函数[登录授权]报错，错误信息为：'+JSON.stringify(res));
      }
    })
  },

  recharge(){ // 跳转支付页面
    router.push('pay');
  },
  activity(){ // 跳转详情页面
    router.push('activity');
  },
  onShareAppMessage(){ // 自定义分享内容
    return {
      title:'欢迎体验猫南北网络工作室支付',
      path:'/pages/index/index',
      imageUrl: '/assets/images/share_mp_logo.png'
    }
  }
})
