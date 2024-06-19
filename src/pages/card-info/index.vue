<script setup>
import { reactive,toRefs } from 'vue';
import Taro,{useLoad}from '@tarojs/taro'
import './index.css';

const modifyUserInfo=()=>{
  console.log("save会员信息")
}
</script>

<template>
<view class="sync-bar">
  <view class="sync-box">
    <view class="again-sync">再次同步</view>
    <view class="weixin-sync">与微信同步会员信息</view>
  </view>
  <image mode='aspectFill' class='go' src='/images/icon-font-solid-1@2x.png'></image>
  <button open-type="getUserInfo" bindgetuserinfo="getUserInfo"></button>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">昵称</view>
  <view class="content">
    昵称
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">手机</view>
  <view class="content">
    手机
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">性别</view>
  <view class="content">
    性别
  </view>
</view>

<view class="blank"></view>

<view class="message-bar">
  <view class="title">生日</view>
  <!-- <view class="content" bindtap="showbirthday"> {{ birthday ? birthday : '保存后不可再次修改' }} </view> -->
   <view>
    生日
   </view>
</view>

<view class="blank"></view>

<button type="primary" color="#04c160" custom-class="button" @click="modifyUserInfo">保存</button>

<van-popup show="{{ showbirthday }}" position="bottom">
  <van-datetime-picker
    type="date"
    min-date="0"
    bind:cancel="hidebirthday"
    bind:confirm="birthdayChange"
  />
</van-popup>
</template>