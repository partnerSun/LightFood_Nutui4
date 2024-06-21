<!-- https://blog.csdn.net/weixin_45559449/article/details/129398318? -->

<script setup>
import { reactive,ref  } from 'vue';
import Taro,{useLoad} from '@tarojs/taro'
import { vipSignApi } from '../../api/login'; 
import {getVipUserInfoApi} from '../../api/user.js'


// 获取微信用户加密数据
const getwxUserData = () => {
	return new Promise((resolve, reject) => {
		Taro.getUserProfile({
			desc: '完善用户信息',
			success: (data) => {
				console.log("getUserProfile获取的用户信息:", data)
				resolve(data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}



// 用户登录
// const appLogin = () => {
//   return new Promise(async(resolve, reject) => {
//       try {
// 		  code.value = await getAppCode()
//           // 微信登录
//           let params = reactive({
//               code: code.value,
//               source: 'MP',
//             //   encryptedata: detail.encryptedData,
//             //   iv: detail.iv
//           })
// 		  let wxloginRes=await loginApi(params)
// 		  console.log("wxloginRes",wxloginRes)
//         //   let wxloginRes = await loginByWx(params)
//           if(wxloginRes.status == 200) {
// 			// console.log("applogin 登录成功")
//               resolve(wxloginRes.data)
//           } else {
// 			// console.log("applogin 登录失败")
//               reject(wxloginRes)
//           }
  
//           // #endif
//       } 
// 	  catch(err) {
//           reject(err)
//       }
//   });
// }

// 授权失败
const onAuthError = () => {
  Taro.showToast({
    title: '授权失败，请确认授权已开启',
    mask: true,
    icon: 'none'
  })
}

// 获取微信用户信息，前提是必须登录 本地有userId
 const wxgetUserInfo = async()=> {
  try {
      // 微信登录
      let userData = await getwxUserData()
      // 调用后台接口登录
    //   let loginRes = await appLogin(userData)
	  let uid=Taro.getStorageSync('userId')
	  let params = reactive({
			id:uid,
			nickName: userData.userInfo.nickName,
            avatarUrl: userData.userInfo.avatarUrl,
			gender:userData.userInfo.gender,
         })
	//登录激活会员
	  await vipSignApi(params)

	//查询并保存会员信息至本地缓存
	  let userInfo = await getVipUserInfoApi(uid)
	  Taro.setStorageSync('userInfo', userInfo.data.items)
    
	//   使用avigateBack不会刷新
      Taro.redirectTo({
      	url: '/pages/personal/index'
      });
	
      // #endif					
   } catch(err) {
  	 onAuthError()
  }
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

