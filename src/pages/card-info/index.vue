<script setup>
import { reactive,toRefs ,ref} from 'vue';
import Taro,{useLoad}from '@tarojs/taro'
import {processPhonerWorkflow} from '../../utils/decryptPhone.js'
import {updateVipInfoApi,getVipUserInfoApi} from '../../api/user.js'
import './index.css';
import icon_font_solid_1_2x from '../../assets/images/icon-font-solid-1@2x.png';

// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})

const data=reactive({
    userInfo: {},
    birthday:'',
});

useLoad(async ()=>{
  data.userInfo=Taro.getStorageSync('userInfo')
 })

const modifyUserInfo=()=>{
  // data.userInfo=Taro.getStorageSync('userInfo')
  console.log("修改的会员信息",'修改会员信息')
  // updateVipInfoApi(data.userInfo)
}
const showBirthday = ref(false)

const min = new Date(1970, 0, 1)
const max = new Date(2034, 0, 1)
const val = ref(new Date(2000, 0, 1))

const dateConfirm = ({ selectedValue }) => {
  data.birthday = selectedValue[0]+"-"+selectedValue[1]+"-"+selectedValue[2];
  // Taro.setStorageSync('userInfo',data.userInfo)
  showBirthday.value = false
}


const updatebirthday=()=>{
  if (!data.userInfo.birthday){
    showBirthday.value=true
  }
}
const updatePhone=async(e)=>{
  await processPhonerWorkflow(e)
}
const {birthday,userInfo}=toRefs(data)
</script>

<template>
<view class="sync-bar">
  <view class="sync-box">
    <view class="again-sync">再次同步</view>
    <view class="weixin-sync">与微信同步会员信息</view>
  </view>
  <image mode='aspectFill' class='go' :src='icon_font_solid_1_2x'></image>
  <button open-type="getUserInfo" bindgetuserinfo="getUserInfo"></button>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">昵称</view>
  <view class="content">
    {{ userInfo.nickName }}
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">手机</view>
  <view class="content">
    {{ userInfo.phone }}
    <button open-type="getPhoneNumber" @getphonenumber="updatePhone" class="btn-ok" size="default"></button>
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">性别</view>
  <view class="content">
    {{ userInfo.gender }}
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">生日</view>
  <view class="content" @click="updatebirthday"> {{ birthday  ? birthday : '保存后不可再次修改' }} </view>
   <!-- <view>
    {{ userInfo.birthday }}
   </view> -->
</view>

<view class="blank"></view>

<button type="primary" color="#04c160" custom-class="button" @click="modifyUserInfo">保存</button>

<nut-popup v-model:visible="showBirthday" position="bottom">
    <nut-date-picker
      v-model="val"
      :min-date="min"
      :max-date="max"
      :three-dimensional="false"
      @confirm="dateConfirm"
    ></nut-date-picker>
  </nut-popup>

</template>