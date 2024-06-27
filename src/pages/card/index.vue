<script setup>
import { reactive,toRefs,ref } from 'vue';
import Taro,{useLoad}from '@tarojs/taro'
import wxbarcode from 'wxbarcode'
import {encryptedStoreData,decodeRetrieveData} from '../../utils/localDataProcess.js'
import './index.css';
import icon_4_card_active from '../../assets/images/icon-4-card-active@2x.png';


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

const canvasRef = ref(null)
const canvasId = 'qrcode' // 设定canvasId
const qrText = ref('') // 替换为你的二维码内容
const size = 430

const data=reactive({
    userInfo: {},
});

useLoad(async ()=>{
  // data.userInfo=Taro.getStorageSync('userInfo')
  data.userInfo = await decodeRetrieveData('userInfo')
  qrText.value=data.userInfo.phone
  // console.log("data.userInfo",data.userInfo)
  if (qrText.value.length>0){
    wxbarcode.qrcode(canvasId, qrText.value, size, size)
  }
  
 })


 const {userInfo}=toRefs(data)

const back=()=>{
  let pageLength=Taro.getCurrentPages().length
  if( pageLength>1){
    Taro.navigateBack({
      delta: 1
    })
  }else{
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

}

const jumpLogin=()=>{
  Taro.navigateTo({
    url: '/pages/login/vipSignIn'
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
  <!-- <canvas ref="canvasRef" :canvas-id="canvasId" style="width: 100%; height: 330px;"></canvas> -->
  <canvas  ref="canvasRef" class="Bitmap" :canvas-id="canvasId" ></canvas>
  <view class="num">{{userInfo.phone}}</view>
</view>
<view v-else class="login-btn">
  <button type="primary" block round @click="jumpLogin">微信登陆后查看会员卡</button>
</view>
<view class="button-bar">
  <view class="button" @click="back">返回首页</view>
</view>


</template>