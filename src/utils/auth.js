// utils/auth.js
import Taro from '@tarojs/taro'

export const isLoggedIn = () => {
  const token = Taro.getStorageSync('token')
  return !!token
}

export const checkLogin = () => {
  console.log('检查登录')
  if (!isLoggedIn()) {
    Taro.showToast({
      title: '请先登录',
      icon: 'none'
    })
    Taro.redirectTo({
      url: '/pages/login/login' // 跳转到登录页面
    })
  }
}
