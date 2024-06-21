<script setup>
import './index.css';
import { reactive, toRefs,ref } from 'vue';
import TabBar from '../../components/TabBar.vue';
import Taro,{useLoad}from '@tarojs/taro'

import {processPhonerWorkflow} from '../../utils/decryptPhone.js'


// 导入本地图片
import icon_font_solid from '../../assets/images/icon-font-solid-1@2x.png';
import logo from '../../assets/images/logo@2x.png';
import icon_4_card_normal from '../../assets/images/icon-4-card-normal@2x.png';
import icon_2_1_shop_cart_normal from '../../assets/images/icon-2-1-shop-cart-normal@2x.png';
import icon_2_menu_normal from '../../assets/images/icon-2-menu-normal@2x.png';
import user_icon_login from '../../assets/images/user-icon-login@2x.png';
import user_icon_edit from '../../assets/images/user-icon-edit@2x.png';
import user_icon_gift from '../../assets/images/user-icon-gift@2x.png';
import user_icon_gift_recode from '../../assets/images/user-icon-gift-recode@2x.png';
import user_icon_about from '../../assets/images/user-icon-about@2x.png';
import user_icon_contact from '../../assets/images/user-icon-contact@2x.png';


// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})
// 手机号认证确认弹窗
const visible=ref(false)
// 底部导航
const tabIndex=ref(3)
// 图片填充方式
const imgMode=ref('aspectFill')

// 
const data=reactive({
    userInfo: {},
});


useLoad(async ()=>{
  data.userInfo=Taro.getStorageSync('userInfo')
 })


// 获取头像
// const chooseAvatar = async (e) => {
//     console.log("获取用户头像",e.detail);
    
// };



const vipSign=()=>{
  Taro.navigateTo({
      url: '/pages/login/vipSignIn'
  })
}

const vipInfoEdit=()=>{
  if (data.userInfo.isvip){
    Taro.navigateTo({
      url: '/pages/card-info/index'
    })
  }else{
    Taro.showToast({
        title: '请微信登录注册会员',
        icon: 'none'
      })
  }

}



const vipSignInWithPhone=()=>{
  if (data.userInfo.isvip){
    visible.value=true
  }else{
    Taro.showToast({
        title: '请微信登录注册会员',
        icon: 'none'
      })
  }
}
const onCancel=()=>{
  visible.value=false
  Taro.showToast({
    title: '取消激活',
    icon: 'error'
  })
}
const onOk=async(e)=>{
  visible.value=false
  await processPhonerWorkflow(e)
}

const {userInfo}=toRefs(data)
</script>

<template>
<view class="mycard"></view>
<view v-if="userInfo.isvip && userInfo.avatarUrl" class="card-bar">
  <view class="card-box">
    <image :mode='imgMode' class='my-photo' :src="userInfo.avatarUrl"></image>
    <view class="name">{{userInfo.nick}}</view>
  </view>

  <navigator url="/pages/card/index" hover-class="none">
  <view class="card-title">
    <view class="title">
      <text>xxx 店铺名 </text>会员卡
    </view>
    <image :mode='imgMode' class='go' :src="icon_font_solid"></image>
  </view>
  </navigator>

  <view class="logos-bar">
    <image :mode='imgMode' class='logos1' :src="logo"></image>
    <view class="logos-box">
      <image :mode='imgMode' class='logos2' :src="icon_4_card_normal"></image>
      <image :mode='imgMode' class='logos3' :src="icon_2_1_shop_cart_normal"></image>
      <image :mode='imgMode' class='logos4' :src="icon_2_menu_normal"></image>
    </view>
  </view>
</view>

<view v-else class="card-bar">
  <navigator url="/pages/login/vipSignIn" hover-class="none">
    <view class="log-in" >微信登录激活会员卡</view>
    <view class="logos-bar">
      <image :mode='imgMode' class='logos1' :src="logo"></image>
      <view class="logos-box">
        <image :mode='imgMode' class='logos2' :src="icon_4_card_normal"></image>
        <image :mode='imgMode' class='logos3' :src="icon_2_1_shop_cart_normal"></image>
        <image :mode='imgMode' class='logos4' :src="icon_2_menu_normal"></image>
      </view>
    </view>
  </navigator>
  <!-- <button @click="vipSign"></button> -->
</view>

<view class="price-bar">
  <!-- <text>{{ userAmount.score }}</text>p -->
  <text>{{userInfo.score}}</text>p
  
</view>


<block v-if="!userInfo.phone || !userInfo.isvip">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_login"></image>
    <view class="content" @click="vipSignInWithPhone">激活会员身份</view>
  </view>
  <view class="blank"></view>
</block>

<view class="content-bar">
  <image :mode='imgMode' class='icon' :src="user_icon_edit"></image>
  <view class="content" @click="vipInfoEdit">编辑会员卡信息</view>
</view>


<view class="blank"></view>
<view class="content-bar">
  <image :mode='imgMode' class='icon' :src="user_icon_gift"></image>
  <view class="content hui">积分换取礼品（即将上线）</view>
</view>

<view class="blank"></view>
<navigator url="/pages/user-record/index" hover-class="none">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_gift_recode"></image>
    <view class="content">积分记录</view>
  </view>
</navigator>

<view class="blank"></view>
<navigator url="/pages/about-us/index" hover-class="none">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_about"></image>
    <view class="content">关于 xxx产品名</view>
  </view>
</navigator>

<view class="blank"></view>
<navigator url="/pages/contact/index" hover-class="none">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_contact"></image>
    <view class="content">联系我们</view>
  </view>
</navigator>


<nut-dialog content="是否同意授权获取您的手机号?" v-model:visible="visible" no-ok-btn no-cancel-btn>
  <template #footer>
    <button @click="onCancel" class="btn-cancel" size="default">取消</button>
    <button open-type="getPhoneNumber" @getphonenumber="onOk" class="btn-ok" size="default">同意</button>
  </template>
</nut-dialog>

<!-- 底部导航栏 -->
<TabBar :tabindex="tabIndex"></TabBar>
</template>

<style>
.nut-dialog{
  width: 70vw;
  background-color: whitesmoke;
  padding: 0;
}
.btn-cancel{
  /* background-color: white; */
  padding: 0;
  margin:0;
  width: 50%;
  border-color: black;
}
/* .nut-dialog button{
  border-color: black;
} */
.btn-ok{
  background-color: whitesmoke;
  padding: 0;
  margin:0;
  width: 50%;
}
</style>