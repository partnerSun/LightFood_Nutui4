<script setup>
import Taro,{useLoad} from '@tarojs/taro'
import { toRefs ,reactive} from 'vue';
import './index.css'
// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})
const data=reactive({
  settleProducts:[],
  settleProductsNum:[],
  settleProductsTotalNum:Number,
  total:String
})

useLoad(()=>{
  // 获取 eventChannel 实例
  const inst =Taro.getCurrentInstance()
  console.log("inst",inst)
  const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();

  // 监听数据
  eventChannel.on('sendDataToOpenedPage', (info)=> {
    console.log('接收到来自商品页面的数据', info)
    data.settleProducts=info.productInfo
    data.settleProductsNum=info.productNum
    data.settleProductsTotalNum=info.productTotalnum
    data.total=info.total
    // 发送数据回 current 页面
    // eventChannel.emit('sendDataToCurrentPage', { data: '数据从 test 页面发出' });
  })
 
})

const {settleProducts,settleProductsNum,settleProductsTotalNum,total}=toRefs(data)
</script>

<template>
  <!-- 通知 -->
<!-- <van-notice-bar
  wx:if="{{purchaseNotes}}"
  custom-class="notice-bar"
  background-color="#f5f5f5"
  text="{{purchaseNotes}}"
/> -->
<view class="shops-bar">
  <view class="shops-box">
    <view class="content">
      <view class="titles">店铺名</view>
      <!-- <van-icon name="arrow"/> -->
    </view>
    <view class="text">距你xxx 米，请确认门店正确</view>
  </view>
  <view class="get">自取</view>
</view>
<view class="shops-bar">
  <view class="shops-box">
    <view class="content">
      <view class="titles">联络电话</view>
    </view>
    <view class="text">123456789</view>
  </view>
  <view class="get1-box">
    <view class="get1">自动填写</view>
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
  </view>
</view>
<navigator url="/pages/select-time/index" hover-class="none">
  <view class="shops-bar">
    <view class="shops-box">
      <view class="content">
        <view class="titles">自取时间</view>
      </view>
      <view class="text">2024-06-21 11:06:33</view>
    </view>
    <!-- <van-icon name="arrow"/> -->
  </view>
</navigator>
<view class="blank1"></view>
<!-- 商品信息 -->
<view v-for="item in settleProducts" :key="item.ID" class="orderdetails-bar">
  <image mode='aspectFill' class='photos' :src="`https:${item.Img}`"></image>
  <view class="titles-bar">
    <view class="titles-box1">
      <view class="titles">{{ item.Product }}</view>
      <view class="price">
        <text>¥</text>{{ item.CurrentPrice }}
      </view>
    </view>
    <view class="titles-box2">
      <view class="titles">{{ item.Discount }}<text> 折</text></view>
      <!-- <view class="num">{{ item.Product }}</view> -->
      <view class="num"><text>x </text>{{ settleProductsNum[item.ID] }}</view>
    </view>
  </view>
</view>

<view class="blank2"></view>

<navigator url="/pages/add-note/index" hover-class="none">
  <view class="shops-bar1">
    <view class="shops-box">
      <view class="content">
        <view class="titles">备注信息</view>
      </view>
      <view class="text">不加香菜</view>
    </view>
    <!-- <van-icon name="arrow"/> -->
  </view>
</navigator>
<view class="num-bar">
  <view class="num">共 {{ settleProductsTotalNum }} 件商品，小计</view>
  <view class="price">
    <text>¥</text>{{ total }}
  </view>
</view>
<view class="blank1"></view>

<!-- <view class="shops-bar">
  <view class="shops-box">
    <view class="content">
      <view class="titles">支付方式</view>
    </view>
    <view class="text">微信支付</view>
  </view>
</view> -->
<view class="blank1 blank-bottom"></view>
<view class="pay-bar">
  <view class="pay-box">
    <view class="title">总价</view>
    <view class="price">
      <text>¥</text>总价
    </view>
  </view>
  <view class="pay-byn" bindtap="createorder">结算</view>
</view>

</template>