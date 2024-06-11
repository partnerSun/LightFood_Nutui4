import Taro from '@tarojs/taro'
import { ref } from 'vue'

let code =ref('')

onLoad(async ()=>{
    code.value = await getAppCode()
})

getAppCode = () => {
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

appLogin = (detail) => {
    return new Promise(async(resolve, reject) => {
        try {
            // 微信登录
            let params = reactive({
                code: code.value,
                source: 'MP',
                encryptedata: detail.encryptedData,
                iv: detail.iv
            })
          //   console.log("模拟登录成功",params)
            let wxloginRes=await loginApi(params)
            console.log("wxloginRes",wxloginRes)
          //   let wxloginRes = await loginByWx(params)
            if(wxloginRes.status == 200) {
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