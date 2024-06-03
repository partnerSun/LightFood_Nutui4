<script setup>
import {ref,onMounted} from 'vue';
import TabBar from '../../components/TabBar.vue';
import Taro  from '@tarojs/taro' 
import { usePullDownRefresh  } from '@tarojs/taro'

import icon_4_card_active from '../../images/icon-4-card-active@2x.png';


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

const handlePullDownRefresh = async () => {
  try {
    console.log('下拉刷新触发');
    // 跳转到另一个页面
    await Taro.navigateTo({
      url: '/pages/vip/index' // 目标页面的路径
    });
    console.log('导航成功');
  } catch (error) {
    console.error('导航失败:', error);
  } finally {
    // 停止下拉刷新
    console.log('停止下拉刷新');
    Taro.stopPullDownRefresh();
  }
};

usePullDownRefresh(()=>{
      // 停止下拉刷新
      Taro.stopPullDownRefresh();
      // 跳转到另一个页面
      Taro.navigateTo({
        url: '/pages/vip/index'  // 目标页面的路径
      });

}) 
onMounted(() => {
  // usePullDownRefresh(handlePullDownRefresh);
  // 如果需要在组件销毁时移除事件监听器，可以使用Taro.offPullDownRefresh

});


  
const jumpShop=()=>{
    Taro.navigateTo({
      url: '/pages/product/index'
    })
}
</script>


<template>
    <!-- <span>index Fallthrough attribute: {{ $attrs }}</span> -->
<view class="top-view">
    <image :mode="imgMode" class='myinc' :src="icon_4_card_active"></image>
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
<!-- <view class="container">
    <video id='myvideo' src='https://ugccsy.qq.com/uwMROfz2r5zBIaQXGdGnC2dfDma3J1MItM3912IN4IRQvkRM/o31507f7lcd.mp4?sdtfrom=v1010&guid=aa18cf106b7fdb7e40f2d20b206f2b4f&vkey=63B0FCCC7FC3ADC342C166D86571AE02772258CD9B515B065DC68DF3919D8C288AE831D570ED5E8FE0FF3E81E170D04FF11F874BFDDACF7AAA2C0CFF2ACB39FB1A94DAD1AB859BDA53E4DD6DBCDC1217CEF789A9AC079924E2BBC599EED7A1FFDD60A727F2EB7E7B6472CE63DD4B683C9199DFC78A6A6C4D9891E05467C4B64E'>
    </video>
    <cover-view class='controls'>
      <cover-view class='play' @tap='play'>
        <cover-image class='img' src='https://img10.360buyimg.com/ling/s345x208_jfs/t1/133501/7/9865/382161/5f5ee31fEbdd6a418/0cdc0156ffff3c23.png' />
      </cover-view>
    </cover-view>
  </view> -->

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