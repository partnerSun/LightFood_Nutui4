<script setup>
import Taro,{useLoad} from '@tarojs/taro'
import { toRefs ,reactive,ref} from 'vue';
import {payApi} from '../../api/pay.js'
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

const inputNumber=ref('')

useLoad(()=>{
  Taro.showLoading({
      title: '加载中...',
      mask: false,
    })
    setTimeout(function () {
      Taro.hideLoading()
    }, 1000)
  // 获取 eventChannel 实例
  const inst =Taro.getCurrentInstance()
  console.log("inst",inst)
  const eventChannel = inst.page ? inst.page.getOpenerEventChannel() : null;
  if (eventChannel) {
  // 监听数据
  eventChannel.on('sendDataToOpenedPage', (info)=> {
    // console.log('接收到来自商品页面的数据', info)
    try {
        data.settleProducts=info.productInfo
        data.settleProductsNum=info.productNum
        data.settleProductsTotalNum=info.productTotalnum
        data.total=info.total
        console.log("data",data)
        eventChannel.emit('sendDataToCurrentPage', { data: true });
      } catch (error) {
        console.error('数据处理出错:', error);
        eventChannel.emit('sendDataToCurrentPage', { data: false });
      }
    })
  }
  // Taro.hideLoading()
  let userinfo =Taro.getStorageSync('userInfo')
  inputNumber.value=userinfo.phone

})


const now = new Date();
// 提取各个部分
const year = now.getFullYear();  // 年
const month = now.getMonth(); // 月（注意：getMonth()返回的月是从0开始的，所以需要+1）
const day = now.getDate();        // 日
const hours = now.getHours();     // 时
const minutes = now.getMinutes(); // 分

const preday = now.getDate()+3; 
const min = new Date(year, month, day,hours,minutes)
const max = new Date(year, month, preday,23,59)

const comment=ref('添加备注')
const initDate=ref(now)
const sendDate=ref('选择配送时间')
const show=ref(false)
const confirm = ({ selectedValue }) => {
  console.log(selectedValue)
  let y=selectedValue[0]
  let m=selectedValue[1]
  let d=selectedValue[2]
  let h=selectedValue[3]
  let min=selectedValue[4]
  sendDate.value=y+"-"+m+"-"+d+"-"+h
  console.log(sendDate.value)
  show.value = false
}
const showDateSelect=()=>{
  show.value=true
}

const formatter = (type, option) => {
  switch (type) {
    case 'year':
      option.text += '年'
      break
    case 'month':
      option.text += '月'
      break
    case 'day':
      option.text += '日'
      break
    case 'hour':
      option.text += '时'
      break
    case 'minute':
      option.text += '分'
      break
    default:
      option.text += ''
  }
  return option
}
const {settleProducts,settleProductsNum,settleProductsTotalNum,total}=toRefs(data)


const createorder= async()=>{
  let uid=Taro.getStorageSync('userId')
  let productStr=Taro.getStorageSync('productQuantities')
  let params=reactive({
    userid:uid,
    origin_settle_products:JSON.parse(productStr),
  })
  console.log("params",params)
  let payRest = await payApi(params)
  console.log("payRest",payRest)
  if(payRest.data.status==200){
    // Taro.navigateTo({
    //   url: '/pages/pay/index',
    // })
    console.log("支付界面")
  }else{
    Taro.showToast({
      title: payRest.data.message,
      icon: 'none',
      duration: 2000
    })
  }
}
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
    <view class="text">
      <nut-input  v-model="inputNumber" placeholder="手机号" max-length="11" type="number" clearable/>
    </view>
  </view>
  <!-- <view class="get1-box">
    <view class="get1">自动填写</view>
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
  </view> -->
</view>
<navigator url="/pages/select-time/index" hover-class="none">
  <view class="shops-bar">
    <view class="shops-box"  @click="showDateSelect">
      <view class="content">
        <view class="titles">
          <text>自取时间</text>
        </view>
      </view>
      <view class="text" style="padding: 10rpx 30rpx;">{{ sendDate }}</view>
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
      <view class="text" >
        <nut-input  v-model="comment" placeholder="添加备注" max-length="32" type="text" clearable/>
      </view>
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
      <text>¥</text>{{ total }}
    </view>
  </view>
  <view class="pay-byn" @click="createorder">结算</view>
</view>

<!-- 配送时间 -->
<nut-popup v-model:visible="show" position="bottom" >
  <nut-date-picker
    v-model="initDate"
    type="datehour"
    :min-date="min"
    :max-date="max"
    :three-dimensional="false"
    :formatter="formatter"
    @confirm="confirm"
  ></nut-date-picker>
</nut-popup>
</template>