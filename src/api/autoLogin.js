import Taro from '@tarojs/taro'
import { ref,reactive } from 'vue'
import {loginApi } from '../api/login.js'



import getAppCode from '../utils/getCode.js'

let code =ref('')
const autoLoginApi = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let wxloginRes = await loginApi(params)
            // console.log("wxloginRes", wxloginRes)
            if (wxloginRes.status === 200) {
                resolve(wxloginRes.data)
            } else {
                reject(wxloginRes)
            }
        } catch (err) {
            reject(err)
        }
    });
}


// 提示函数
const onTipWindows = (type) => {
    if (type == 'failed') {
        Taro.showToast({
            title: 'token续期失败',
            mask: true,
            icon: 'none'
          })
    }else if (type =='success') {
        Taro.showToast({
            title: '重新加载',
            mask: false,
            icon: 'none',
        })
    }

}

export const autoLogin = async () => {
    try {
         // 获取最新的 code
         code.value = await getAppCode()

         // 准备登录参数
         let params = reactive({
             code: code.value,
             source: 'MP',
         })
        //  console.log("autologin data",params)
        // 调用后台接口登录
        let loginRes = await autoLoginApi(params)
        // console.log("loginRes.data",loginRes.data)
        // savecache
        Taro.setStorageSync('autoLogin', true)
        Taro.setStorageSync('Authorization', loginRes.data.token)
        Taro.setStorageSync('userId', loginRes.data.userId)
        // Taro.navigateBack({
        //     delta: 1
        // });
        // #endif			
     } catch(err) {
        onTipWindows('failed')
    }
  } 