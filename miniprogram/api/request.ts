import { getToken, removeToken, setToken } from "../utils/auth"

// const baseUrl = 'http://localhost:8080'
const baseUrl = 'https://ztian-music-1690062-1310031202.ap-shanghai.run.tcloudbase.com'


export const get = (uri: string) => {
    wx.showLoading({
      title: '加载中'
    })
    
    return new Promise<any>((resolve, reject)=>{
      wx.request({
        url: baseUrl + uri,
        method: 'GET',
        success: (res)=>{
          if(res.statusCode === 401) {
            removeToken()
            const currentPages = getCurrentPages()
            const currentRoute = currentPages[currentPages.length - 1].route
            if (currentRoute !== 'pages/login/index') {
              wx.navigateTo({
                url: `/pages/login/index`
              })
            }
            wx.showToast({
              title: '用户未登录',
              icon: 'error'
            })
          }
          resolve(res.data)
        },
        fail: reject,
        complete: ()=>{
          wx.hideLoading()
        }
      })
    })
}

export const post = (uri: string, data: object) => {
  wx.showLoading({
    title: '加载中'
  })
  
  return new Promise<any>((resolve, reject)=>{
    wx.request({
      url: baseUrl + uri,
      method: 'POST',
      data,
      success: (res)=>{
        if(res.statusCode === 401) {
          // 清除token状态 并跳转到login界面
          removeToken()
          const currentPages = getCurrentPages()
          const currentRoute = currentPages[currentPages.length - 1].route
          if (currentRoute !== 'pages/login/index') {
            wx.navigateTo({
              url: `/pages/login/index`
            })
          }
          wx.showToast({
            title: '用户未登录',
            icon: 'error'
          })
        }
        _handleToken(res.header)

        resolve(res.data)
      },
      fail: reject,
      complete: ()=>{
        wx.hideLoading()
      }
    })
  })
}


const _handleToken = (header: any) => {
  const token = header['Authorization'] || null
  if (token && getToken() !== token) {
    wx.showToast({
      title: '登录成功！',
      icon: 'success'
    })
    setToken(token)

    wx.navigateBack()

  }
}