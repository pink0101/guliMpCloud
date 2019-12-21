//app.js
let router = require('./utils/router.js')
App({
  router,
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // 云函数的初始化
      wx.cloud.init({
        env: 'pink-pc4mv',//后续 API 调用的默认环境配置
        traceUser: true,//是否将用户访问记录到用户管理中，在控制可见
      })
    }

    this.globalData = {}
  }
})
