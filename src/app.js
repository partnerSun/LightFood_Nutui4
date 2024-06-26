import { createApp } from 'vue'
import './app.css'

import { ConfigProvider } from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'
import { autoLogin } from './api/autoLogin.js'
const App = createApp({
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  // onShow (options) {
  //   console.log("小程序入口onShow options:",options)
  // },
  
  onLaunch() {
    console.log('小程序启动');
    let uid=Taro.getStorageSync('userId')
    let tokenValue=Taro.getStorageSync('encryptedToken');
    if (!uid || !tokenValue){
      autoLogin() 
    }
  }
  
})

App.use(ConfigProvider)

export default App
