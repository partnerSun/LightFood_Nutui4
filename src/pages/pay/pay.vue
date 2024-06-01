<script setup>
import Taro from '@tarojs/taro'
import { checkLogin, isLoggedIn } from '../../utils/auth'

const makePayment=() =>{
   checkLogin() // 检查是否已登录
   const token = Taro.getStorageSync('token')
   Taro.request({
     url: 'https://yourserver.com/pay', // 服务器支付接口
     method: 'POST',
     header: {
       Authorization: `Bearer ${token}` // 使用Authorization头携带token
     },
     data: {
       amount: 1 // 支付金额，单位为分
     },
     success: response => {
       const paymentData = response.data
       Taro.requestPayment({
         ...paymentData,
         success: res => {
           Taro.showToast({
             title: '支付成功',
             icon: 'success'
           })
         },
         fail: err => {
           Taro.showToast({
             title: '支付失败',
             icon: 'none'
           })
         }
       })
     }
   })
 }
 
onShow(()=> {
   checkLogin() // 页面显示时检查登录状态
})
</script>

<template>
    <view>
      <button @click="makePayment">支付</button>
    </view>
</template>