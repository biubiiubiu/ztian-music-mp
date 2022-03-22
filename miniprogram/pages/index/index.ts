// index.ts

import { sayHelo } from "../../api/hello"

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    message: 'Hello World'
  },
  hi() {
    sayHelo().then(data=>{
      // console.log(data)
      const message = data + ''
      this.setData({
        message
      })
    })
  }
})
