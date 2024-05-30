<script setup>
import {ref} from 'vue';
import TabBar from '../../components/TabBar.vue';
import Taro  from '@tarojs/taro' 
import { usePullDownRefresh  } from '@tarojs/taro'
// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

const list=ref([
    'http://light-food.wfzwrjx.cn/images/dp1.jpg',
    'http://light-food.wfzwrjx.cn/images/dp2.jpg',
    'http://light-food.wfzwrjx.cn/images/dp3.jpg'
])

const tabIndex=ref(0)
const imgMode=ref('aspectFill')

usePullDownRefresh(()=>{
      // 跳转到另一个页面
      Taro.navigateTo({
        url: '/pages/index/vip'  // 目标页面的路径
      });

      // 停止下拉刷新
      Taro.stopPullDownRefresh();
}) 
  
const jumpShop=()=>{
    Taro.navigateTo({
      url: '/pages/product/index'
    })
}
</script>


<template>
    <!-- <span>index Fallthrough attribute: {{ $attrs }}</span> -->
<view class="top-view">
    <image :mode="imgMode" class='myinc' src='http://light-food.wfzwrjx.cn/images/card-active.png'></image>
    <view class="vip-card">下滑查看会员卡</view>
</view>

<view style="margin-top: 5rpx;">
    <nut-swiper 
    auto-play="5000" 
    init-page="0"
    style="margin: auto;width: 94vw; border-radius: 3rpx;"
    >
      <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 30vh;">
        <img :src="item" alt="" style="height: 100%; width: 100%;" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>
</view>

<view class="shop">
  <view class="Nearby-stores">门店</view>
</view>

<view class="shop-list">
  <image mode='aspectFill' class='shop-logo1' src='http://light-food.wfzwrjx.cn/images/bbb.png'></image>
  <view class="shop-logo2">
    <image :mode="imgMode" class='shop-logo' src='http://light-food.wfzwrjx.cn/images/logo.png' ></image>
    <view class="shop-name">店铺名</view>

    <view class="distance-bar">
      <view class="distance">99.99km</view>
      <image :mode="imgMode" class='arrow' src='http://light-food.wfzwrjx.cn/images/font-solid.png' :onTap="jumpShop"></image>
    </view>
  </view>
</view>

<!-- 底部导航栏 -->
<TabBar :tabindex="tabIndex"></TabBar>

</template>

<style>
.top-view{
  display: flex;
  justify-content:space-between;
  padding: 15rpx 30rpx 15rpx 30rpx;
  margin-top: 5rpx;

}
.vip-card{
  width: 168rpx;
  height: 34rpx;
  font-size: 24rpx;
  text-align: right;
  color: #b3b3b3;
}
.myinc{
  width: 32rpx;
  height: 24rpx;
  border-radius: 4rpx;
}
.shop{
  display: flex;
  justify-content:space-between;
  align-items: flex-end;
}
.shop .Nearby-stores{
  font-size: 32rpx;
  color: #3c3c3c;
  margin:40rpx 460rpx 20rpx 36rpx ;

}


.shop-list{
  display: flex;
  justify-content:center;
  margin-right: 30rpx;
  margin-left:36rpx ;
  margin-bottom: 24rpx;
}

.shop-list .shop-logo1{
  width: 400rpx;
  height: 320rpx;
  object-fit: contain;
  border-radius: 12rpx;
}

.shop-list .shop-logo2{
  display: flex;
  flex-direction:column;
  width: 266rpx;
  height: 320rpx;
  border-radius: 12rpx;
  background-color: #f2f3f5;
  margin-left:18rpx;
}

.shop-list .shop-logo2 .shop-logo{
  width: 72rpx;
  height: 88rpx;
  margin:48rpx 160rpx 30rpx 34rpx;
}
.shop-list .shop-logo2 .shop-name{
  width: 200rpx;
  height: 88rpx;
  font-size: 32rpx;
  color: #3c3c3c;
  margin:0rpx 32rpx 0rpx 34rpx;
}

.shop-list .shop-logo2 .distance-bar{
  display: flex;
  justify-content:space-between;
  margin:10rpx 32rpx 20rpx 34rpx;
}

.shop-list .shop-logo2 .distance-bar .distance{
  width: 84rpx;
  height: 36rpx;
  
  font-size: 26rpx;
  font-weight: 500;
  color: #b3b3b3;
}
.shop-list .shop-logo2 .distance-bar .arrow{
  width: 32rpx;
  height: 32rpx;
  object-fit: contain;
  margin-left: 84rpx;
}
</style>