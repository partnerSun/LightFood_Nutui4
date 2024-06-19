<script setup>
import { reactive,toRefs } from 'vue';
import Taro,{useLoad}from '@tarojs/taro'
import './index.css';
import icon_4_card_active from '../../assets/images/icon-4-card-active@2x.png';


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

const data=reactive({
    userInfo: {},
});

useLoad(async ()=>{
  data.userInfo=Taro.getStorageSync('userInfo')
  // console.log("data.userInfo",data.userInfo)
 })


 const {userInfo}=toRefs(data)

const back=()=>{
    Taro.navigateBack({
      delta: 1
    });
}
const jumpLogin=()=>{
  Taro.navigateTo({
      url: '/pages/login/vipLogin'
    })
}
</script>

<template>
<view class="card-box">
  <image mode='aspectFill' class='card' :src='icon_4_card_active'></image>
  <view class="integral">我的积分</view>
</view>
<view class="pricebar">
  <view class="price">{{userInfo.score}}</view>
  <view class="units">p</view>
</view>

<view v-if="userInfo.isvip && userInfo.avatarUrl" class="number-bar">
  <view class="title">会员卡号码</view>
  <canvas type="2d" class="Bitmap" canvas-id="qrcode" :style="{width:'100%'}"></canvas>
  <view class="num">111111111111111</view>
</view>
<view v-else class="login-btn">
  <button type="primary" block round @click="jumpLogin">微信登陆后查看会员卡</button>
</view>
<view class="button-bar">
  <view class="button" @click="back">返回首页</view>
</view>


</template>