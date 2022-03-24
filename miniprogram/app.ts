// app.ts
// App<IAppOption>({
//   globalData: {},
//   onLaunch() {
//     // 展示本地存储能力
//     const logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         console.log(res.code)
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       },
//     })
//   },
// })
import { getToken } from "./utils/auth";

// app.ts
App({
  globalData: {},
  _isLoginPage() {
    const currentPages = getCurrentPages()
    console.log(currentPages)
    return false;
  },
  onShow() {
  
    // if (!getToken()) {
    //   wx.navigateTo({
    //     url: '/pages/login/index'
    //   })
    // }
  },
})