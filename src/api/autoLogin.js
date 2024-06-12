import Taro,{useLoad} from '@tarojs/taro'
import { ref,reactive,onMounted } from 'vue'
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

useLoad ( ()=>{
    code.value = getAppCode()
    console.log("code",code.value)
})

export const autoLogin = () => {
    return new Promise(async(resolve, reject) => {
        try {
            // 微信登录
            let params = reactive({
                code: code.value,
                source: 'MP',
            })
          //   console.log("模拟登录成功",params)
          setTimeout(() => {
            console.log("After 3 seconds");
        }, 3000);
        
            let wxloginRes=await loginApi(params)
            console.log("wxloginRes",wxloginRes)
          //   let wxloginRes = await loginByWx(params)
            if(wxloginRes.status == 200) {
                Taro.setStorageSync('Authorization', wxloginRes.data.token)
                console.log("applogin 登录成功")
                resolve(wxloginRes.data)
            } else {
              console.log("applogin 登录失败")
                reject(wxloginRes)
            }
    
            // #endif
        } 
        catch(err) {
            reject(err)
        }
    });
  }