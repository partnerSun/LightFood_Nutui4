import Taro,{useLoad} from '@tarojs/taro'
import { ref,reactive } from 'vue'
import {loginApi } from '../api/login.js'

let code =ref('')

const getAppCode = () => {
    return new Promise((resolve, reject) => {
        Taro.login({
            // provider: 'weixin',
            success: res => {
                resolve(res.code)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// useLoad(async () => {
//     try {
//         code.value = await getAppCode()
//         console.log("code", code.value)
//     } catch (err) {
//         console.error("Failed to get code", err)
//     }
// })


const autoLoginApi = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let wxloginRes = await loginApi(params)
            console.log("wxloginRes", wxloginRes)

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

        // 调用后台接口登录
        let loginRes = await autoLoginApi(params)
        console.log("loginRes.data",loginRes.data)
        // savecache
        Taro.setStorageSync('isLogin', true)
        Taro.setStorageSync('Authorization', loginRes.data.token)
        // Taro.navigateBack({
        //     delta: 1
        // });
        // #endif			
     } catch(err) {
        onTipWindows('failed')
    }
  } 