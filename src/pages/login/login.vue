<script setup>
import Taro from '@tarojs/taro'

const onGetUserInfo= async (e)=> {
    if (e.detail.userInfo) {
      // 用户允许授权
      Taro.login({
        success: res => {
          if (res.code) {
            // 发送 res.code 到服务器换取 openid 和 session_key
            Taro.request({
              url: 'https://yourserver.com/onLogin', // 服务器登录接口
              method: 'POST',
              data: {
                code: res.code
              },
              success: response => {
                const { token } = response.data
                // 保存 token 到本地
                Taro.setStorageSync('token', token)
                Taro.showToast({
                  title: '登录成功',
                  icon: 'success'
                })
                Taro.redirectTo({
                  url: '/pages/index/index' // 跳转到主页
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      console.log('用户拒绝授权')
    }
  }

const getPhoneNumber = async (e) => {
    console.log(e.detail, "获取手机号回调");
  };

</script>

<template>
    <view>
      <!-- <button open-type="getUserInfo" @getuserinfo="onGetUserInfo">登录</button> -->
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
    </view>
  </template>
  