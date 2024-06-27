import Taro from '@tarojs/taro'
import getAppCode from './getCode.js'
import {updateVipPhoneApi,getVipUserInfoApi} from '../api/user.js'
import {encryptedStoreData} from './localDataProcess.js'

// 获取当前路由
const getCurrentRoute = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage.route
}

// 获取加密手机号数据
const getPhoneNumber = async (e) => {
  console.log('获取手机加密数据',e)
    if (e.detail)  {
      Taro.showToast({
        title: '手机号获取成功',
        icon: 'success'
      })
      return e.detail
    }else{
      Taro.showToast({
        title: '手机号获取失败',
        icon: 'error'
      })
      return
    }

 };

//  解密、更新
 export const processPhonerWorkflow=async(e)=>{
  // 获取用户手机号的加密数据，企业认证的小程序才有权限获取此信息
  let returnData = await getPhoneNumber(e)

  // 获取code
  let code = await getAppCode()
  // 封装请求参数
  let data={
      encryptedata:returnData.encryptedData,
      iv:returnData.iv,
      code:code,
  }

  let updatePhoneRes=await updateVipPhoneApi(data)


  let uid=Taro.getStorageSync('userId')
	//查询并保存会员信息至本地缓存
	let userInfo = await getVipUserInfoApi(uid)
	await encryptedStoreData('userInfo', userInfo.data.items)

  if (updatePhoneRes.data.status===200 && userInfo.data.status===200 ){
    Taro.showToast({
      title: '注册成功',
      icon: 'success'
    })
  }else{
    Taro.showToast({
      title: '注册失败',
      icon: 'error'
    })
  }
  
  const currentroute=getCurrentRoute()
  // console.log("当前路由是:", currentroute)
  if ( currentroute === 'pages/personal/index' ){
    Taro.redirectTo({
      url: '/pages/personal/index'
    })
  }else if( currentroute === 'pages/card-info/index'){
    Taro.redirectTo({
      url: '/pages/card-info/index'
    })
  }

 }