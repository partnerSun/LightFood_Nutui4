import axios from 'axios'
// import {CONFIG} from '../config/index.js'
import Taro from '@tarojs/taro'
import { autoLogin } from './autoLogin.js'
import {retrieveToken} from '../utils/tokenSafe.js'


axios.interceptors.request.use(
    async function (config) {
        //在request时添加时间戳，解决缓存问题
        if (config.method=="get"){
            let timeStamp = (new Date()).getTime()
            //判断是否有Parmas参数
            if (config.params) {
                //有params参数，就可以把时间戳添加到参数当中
                config.params.timeStamp = timeStamp
            }else{
                //如果没有params，就声明一个 并添加时间戳进去
                config.params={
                    timeStamp: timeStamp
                }
            }
        }
        //从本地把token取出来，添加到请求头中
        let tokenValue = ""
        try {
            // tokenValue = window.localStorage.getItem('Authorization')
            // 获取加密的token，并解密
            tokenValue = await retrieveToken()
        } catch (error) {
             tokenValue = ""
        }
        // 将token添加到请求头中
        if ( tokenValue == "" || tokenValue == null ) {
            config.headers['Authorization'] = ""
        }else {
            config.headers['Authorization'] = tokenValue
        }
        return config;
  }, function (error) {
    console.log("error:",error.message)
    return Promise.reject(error);
  });

// 获取当前路由
const getCurrentRoute = () => {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage.route
}

// 添加响应拦截器
// 判断登录状态是否失效, 状态码是200还是401,
// 如果是401，删除本地的token，跳转到登录页面
// 如果是其他触发error
axios.interceptors.response.use(async  function (response) {
    if ( response.data.status == 200 ){
        return Promise.resolve(response)
    }else if (response.data.status == 401){
        // Taro.removeStorageSync('Authorization');
  
        const currentroute=getCurrentRoute()
        // console.log("当前路由是:", currentroute)
        if (currentroute !== 'pages/login/login' ){
            Taro.showLoading({
                title: '加载中',
            })
            await autoLogin() 
            //重新打开刷新此页面
            await Taro.reLaunch({
              url: '/' + currentroute
            })
            Taro.hideLoading()
        }
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    console.log("请求错误error:",error.message)
    // 对响应错误做点什么
    return Promise.reject(error);
  });


//定义四个有默认值的参数
const request = (url='',data={},method='get',timeout=5000) =>{
    //返回一个Promise对象，用于异步处理请求结果。resolve和reject是Promise的两个回调函数，分别用来表示成功和失败。
    return new Promise((resolve,reject)=>{
        // console.log("使用axios请求接口")
        //将请求参数强制转换为小写
        const methodLower = method.toLowerCase()
        if (methodLower === 'get'){
            //
            axios({
                method: methodLower,
                params: data,
                url: url,
                timeout: timeout
            })
            //成功
            .then(
                (response)=>{
                    resolve(response)
                }
            )
            //失败
            .catch(
                (error)=>{
                    reject(error)
                }
            )
        }else if (methodLower=== 'post'){
            axios({
                method: methodLower,
                data: data,
                url: url,
                timeout: timeout,
            })
            .then(
                (response)=>{
                    resolve(response)
                }
            )
            .catch(
                (error)=>{
                    reject(error)
                }
            )
        }
    })
}


export default request
