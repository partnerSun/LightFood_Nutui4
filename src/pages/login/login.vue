<!-- https://blog.csdn.net/weixin_45559449/article/details/129398318? -->

<script setup>
// import { loginByWx, loginByAlipay } from '@/api/user.js'
import { reactive, toRefs,ref ,onBeforeMount,onMounted } from 'vue';
import Taro,{useLoad} from '@tarojs/taro'
import { login2 } from '../../utils/login'; 

let code=ref('')

useLoad(async ()=>{
  code.value = await getAppCode()
 })
    

// 获取微信用户信息
const wxgetUserInfo = async()=> {
  try {
      // 微信登录
      let userData = await getwxUserData()
      // 调用后台接口登录
      let loginRes = await appLogin(userData)
	  console.log("userData",userData)
	  console.log("loginRes",loginRes)
      // savecache
      Taro.setStorageSync('isLogin', true)
      Taro.setStorageSync('userInfo', {
        headImg: loginRes.headImg,
        userName: loginRes.userName
      });
      Taro.setStorageSync('token', loginRes.token)
      Taro.setStorageSync('userId', loginRes.userId)
      Taro.navigateBack({
      	delta: 1
      });
      // #endif					
   } catch(err) {
  	 onAuthError()
  }
}

// 授权失败
const onAuthError = () => {
  Taro.showToast({
    title: '授权失败，请确认授权已开启',
    mask: true,
    icon: 'none'
  })
}

// 获取微信用户加密数据
const getwxUserData = () => {
	return new Promise((resolve, reject) => {
		Taro.getUserProfile({
			desc: '完善用户信息',
			success: data => {
				console.log("用户信息：", data)
				resolve(data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 获取 临时登录凭证code
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

// 用户登录
const appLogin = (detail) => {
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
		  let wxloginRes=await login2(params)
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

</script>

<template>
	<view class="content">
		<!-- <image src="logo.png"></image> -->
		<view class="title">申请获取以下权限</view>
		<text class="msg">获取你的公开信息（昵称、头像、地区等）</text>
		<!-- #ifdef MP-WEIXIN -->
		<button class="btn" @click="wxgetUserInfo">授权登录</button>
	</view>
</template>

<style lang="less">

view, text, image, input {
	box-sizing: border-box;
}

.content {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	padding: 160rpx 40rpx 0;
	
	image {
		width: 275rpx;
		height: 104rpx;
	}
	.title {
		width: 100%;
		margin-top: 80rpx;
		font-size: 30rpx;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.85);
		text-align: left;
	}
	.msg {
		display: block;
		width: 100%;
		margin-top: 16rpx;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.65);
		text-align: left;
	}
	
	.btn {
		position: absolute;
		bottom: 160rpx;
		width: 670rpx;
		height: 96rpx;
		background: #00B391;
		border-radius: 8rpx;
		font-size: 34rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 96rpx;
	}
}
</style>

