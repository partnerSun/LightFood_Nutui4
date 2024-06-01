<script setup>
import { reactive, toRefs,ref ,onBeforeMount,onMounted } from 'vue';
import TabBar from '../../components/TabBar.vue';
import Taro,{eventCenter,getCurrentInstance}from '@tarojs/taro'
import { checkLogin, isLoggedIn } from '../../utils/auth'
// 导入本地图片
import icon_font_solid from '../../images/icon-font-solid-1@2x.png';
import logo from '../../images/logo@2x.png';
import icon_4_card_normal from '../../images/icon-4-card-normal@2x.png';
import icon_2_1_shop_cart_normal from '../../images/icon-2-1-shop-cart-normal@2x.png';
import icon_2_menu_normal from '../../images/icon-2-menu-normal@2x.png';
import user_icon_login from '../../images/user-icon-login@2x.png';
import user_icon_edit from '../../images/user-icon-edit@2x.png';
import user_icon_gift from '../../images/user-icon-gift@2x.png';
import user_icon_gift_recode from '../../images/user-icon-gift-recode@2x.png';
import user_icon_about from '../../images/user-icon-about@2x.png';
import user_icon_contact from '../../images/user-icon-contact@2x.png';

// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})

const tabIndex=ref(3)
const data=reactive({
    userAmount: {
        store: "123"
    },
    userInfo: {
        avatarUrl:'http://light-food.wfzwrjx.cn/images/touxiang.png',
        nick:'测试昵称',

    },
});

const {userAmount,userInfo}=toRefs(data)
// const icon_font_solid=ref('http://light-food.wfzwrjx.cn/images/src/icon-font-solid-1@2x.png')
// const logo=ref('http://light-food.wfzwrjx.cn/images/src/logo@2x.png')
// const icon_4_card_normal=ref('http://light-food.wfzwrjx.cn/images/src/icon-4-card-normal@2x.png')
// const icon_2_1_shop_cart_normal=ref('http://light-food.wfzwrjx.cn/images/src/icon-2-1-shop-cart-normal@2x.png')
// const icon_2_menu_normal=ref('http://light-food.wfzwrjx.cn/images/src/icon-2-menu-normal@2x.png')
// const user_icon_login=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-login@2x.png')
// const user_icon_edit=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-edit@2x.png')
// const user_icon_gift=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-gift@2x.png')
// const user_icon_gift_recode=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-gift-recode@2x.png')
// const user_icon_about=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-about@2x.png')
// const user_icon_contact=ref('http://light-food.wfzwrjx.cn/images/src/user-icon-contact@2x.png')
const imgMode=ref('aspectFill')

onMounted(() => {
  // checkLogin()
  eventCenter.on(getCurrentInstance().router.onShow, () => {
    checkLogin()
    console.log('onShow1')
  })
})
</script>

<template>
<view class="mycard"></view>
<view v-if="userInfo && userInfo.avatarUrl" class="card-bar">
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
  <view class="log-in">微信登录激活会员卡</view>
  <view class="logos-bar">
    <image :mode='imgMode' class='logos1' :src="logo"></image>
    <view class="logos-box">
      <image :mode='imgMode' class='logos2' :src="icon_4_card_normal"></image>
      <image :mode='imgMode' class='logos3' :src="icon_2_1_shop_cart_normal"></image>
      <image :mode='imgMode' class='logos4' :src="icon_2_menu_normal"></image>
    </view>
  </view>
  <button bindtap="updateUserInfo"></button>
</view>

<view class="price-bar">
  <text>{{ userAmount.score }}</text>p
</view>


<block v-if="!userInfo || !userInfo.avatarUrl">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_login"></image>
    <view class="content">登陆激活会员身份</view>
    <button bindtap="updateUserInfo"></button>
  </view>
  <view class="blank"></view>
</block>

<navigator url="/pages/card-info/index" hover-class="none">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_edit"></image>
    <view class="content">编辑会员卡信息</view>
  </view>
</navigator>

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
    <view class="content">关于xxx产品名</view>
  </view>
</navigator>

<view class="blank"></view>
<navigator url="/pages/about-us/detail?key=contact" hover-class="none">
  <view class="content-bar">
    <image :mode='imgMode' class='icon' :src="user_icon_contact"></image>
    <view class="content">联系我们</view>
  </view>
</navigator>

<!-- 底部导航栏 -->
<TabBar :tabindex="tabIndex"></TabBar>
</template>

<style>
page{
  position: relative;
}
.mycard{
  height: 180rpx;
  width: 100vw;
  background-color: #fcde51;
}
.card-bar{
  background: #fff;
  position: absolute;
  top:28rpx;
  left: 78rpx;
  width: 598rpx;
  height: 304rpx;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 24rpx 0 rgba(0, 0, 0, 0.06), 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
}
.card-bar button {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 99;
  left: 0;
  top: 0;
}
.card-bar .card-box{
  display: flex;
  margin-left: 36rpx;
  margin-top: 36rpx;
  align-items: center;
}
.card-bar .card-box .my-photo{
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
}
.card-bar .card-box .name{
  
  font-size: 26rpx;
  font-weight: 600;
  color: #3d3d3d;
  margin-left: 16rpx;
}
.card-bar .card-title{
  display: flex;
  margin-left: 306rpx;
  margin-top: 52rpx;
  
  align-items: center;
}
.card-bar .card-title .title{
  font-size: 26rpx;
  letter-spacing: 2px;
  color: #3d3d3d;
}
.card-bar .card-title .title text{
  font-size: 26rpx;
  letter-spacing: 2px;
  color: #3d3d3d;
}
.card-bar .card-title .go{
  width: 32rpx;
  height: 32rpx;
}

.logos-bar{
  display: flex;
  justify-content: space-between;
  margin: 50rpx 30rpx 22rpx 36rpx;
  align-items: flex-end;
}
.logos-bar .logos1{
  width: 48rpx;
  height: 60rpx;
}
.logos-bar .logos-box{
  display: flex;
  align-items: center;
}
.logos-bar .logos-box .logos2{
  width: 32rpx;
  height: 24rpx;
  object-fit: contain;
}
.logos-bar .logos-box .logos3{
  width: 32rpx;
  height: 32rpx;
  object-fit: contain;
  margin-left: 30rpx;
}

.logos-bar .logos-box .logos4{
  width: 40rpx;
  height: 32rpx;
  object-fit: contain;
  margin-left: 30rpx;
}

.price-bar{
  margin-top: 182rpx;
  margin-left: 90rpx;
  margin-bottom: 126rpx;
  font-size: 28rpx;
  color: #3d3d3d;
}
.price-bar text{
  font-size: 84rpx;
  margin-right: 6rpx;
}
.content-bar{
  display: flex;
  align-items: center;
  margin-left: 82rpx;
  margin-top: 36rpx;
  margin-bottom: 36rpx;
  position: relative;
}
.content-bar button {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 99;
  left: 0;
  top: 0;
}
.content-bar .icon{
  width: 64rpx;
  height: 64rpx;
  object-fit: contain;
}
.content-bar .content{
  
  font-size: 30rpx;
  color: #3c3c3c;
  margin-left:32rpx ;
}
.content-bar .content.hui{
  color: #8a8a8a;
}
.blank{
  width: 570rpx;
  height: 2rpx;
  background-color: #ebebeb;
  margin-left: 178rpx;
}
.card-bar .log-in{
  
  font-size: 26rpx;
  font-weight: 600;
  text-align: center;
  color: #3d3d3d;
  margin-top: 138rpx;
}
.bottom {
  height: 144rpx;
}
</style>