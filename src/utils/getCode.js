// 获取微信临时code
import Taro from '@tarojs/taro'
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

export default getAppCode