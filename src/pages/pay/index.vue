<script setup>
import Taro,{useLoad} from '@tarojs/taro'
import { toRefs ,reactive,ref} from 'vue';
import {payApi} from '../../api/pay.js'
import {getOrderInfo} from '../../utils/getOrder.js'
import {decodeRetrieveData} from '../../utils/localDataProcess.js'
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

useLoad(async()=>{
  let userinfo = await decodeRetrieveData('userInfo')
  Taro.showLoading({
      title: '加载中...',
      mask: false,
    })
    setTimeout(function () {
      Taro.hideLoading()
    }, 1000)
  // 获取 eventChannel 实例
  const inst =Taro.getCurrentInstance()
  // console.log("inst",inst)
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
        // console.log("data",data)
        eventChannel.emit('sendDataToCurrentPage', { data: true });
      } catch (error) {
        console.error('数据处理出错:', error);
        eventChannel.emit('sendDataToCurrentPage', { data: false });
      }
    })
  }
  // Taro.hideLoading()
  
  // console.log("userinfo",userinfo)
  inputNumber.value=userinfo.phone

})


const now = new Date();
// 提取各个部分
const year = now.getFullYear();  // 年
const month = now.getMonth(); // 月（注意：getMonth()返回的月是从0开始的，所以需要+1）
const day = now.getDate();        // 日
const hours = now.getHours();     // 时
const minutes = now.getMinutes(); // 分

// 用于时间选择器的最大时间范围，延迟1年1月7天
let dateLater = new Date(now);
dateLater.setFullYear(now.getFullYear() + 1);
dateLater.setMonth(now.getMonth() + 1);
dateLater.setDate(now.getDate() + 7);
const yearLater = dateLater.getFullYear();
const monthLater = dateLater.getMonth()+1; 
const dayLater = dateLater.getDate(); 

// 构造默认自提时间各部分，延迟35分钟
const defaultTimeLater= new Date(now);
defaultTimeLater.setMinutes(now.getMinutes() + 35);
const defaultyearLater = defaultTimeLater.getFullYear(); 
const defaultmonthLater = defaultTimeLater.getMonth()+1;
const defaultdayLater = defaultTimeLater.getDate();
const defaulthourLater = defaultTimeLater.getHours();
const defaultminLater = defaultTimeLater.getMinutes(); 

// 用于时间选择器的时间范围限制
const min = new Date(year, month, day,hours,minutes)
const max = new Date(yearLater, monthLater-1, dayLater,23,59)
// 
const comment=ref('添加备注')

// 时间选择器的默认值
const initDate=ref(defaultTimeLater)


// 自提时间的默认值
let selfGetDate = ref(
    defaultyearLater + "-" +
    (defaultmonthLater < 10 ? '0' + defaultmonthLater : defaultmonthLater) + "-" + // 修正：格式化为两位数
    (defaultdayLater < 10 ? '0' + defaultdayLater : defaultdayLater) + " " +       // 修正：格式化为两位数
    (defaulthourLater < 10 ? '0' + defaulthourLater : defaulthourLater) + ":" +   // 修正：格式化为两位数
    (defaultminLater < 10 ? '0' + defaultminLater : defaultminLater) + ":00"       // 修正：格式化为两位数
);

const showDateSelecter=ref(false)

const confirm = ({ selectedValue }) => {
  // console.log(selectedValue)
  let y=selectedValue[0]
  let m=selectedValue[1]
  let d=selectedValue[2]
  let h=selectedValue[3]
  let min=selectedValue[4]
  selfGetDate.value=y+"-"+m+"-"+d+" "+h+":"+min+":00"
  // console.log(selfGetDate.value)
  showDateSelecter.value = false
}
const showDateSelect=()=>{
  showDateSelecter.value=true
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
    phone:inputNumber.value,
    getdate:selfGetDate.value,
    comment:comment.value,
  })
  // console.log("params",params)

  // 发送结算信息给后端（更新订单、积分、结算价格）
  let payRes = await payApi(params)
  console.log("支付接口返回数据",payRes)
  if(payRes.data.status==200){
    let totalP = payRes.data.data.total
    console.log('支付总价',totalP)
    // Taro.navigateTo({
    //   url: '/pages/pay/index',
    // })
    // 后端计算返回商品总价
    console.log("付款")

  }else{
    Taro.showToast({
      title: payRes.data.message,
      icon: 'none',
      duration: 2000
    })
  }
  // console.log("更新获取订单信息")
  // 付款后 自动更新获取该用户的所有订单信息，以后虚增加查询限制    
  // await getOrderInfo()

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
<!-- <navigator url="/pages/select-time/index" hover-class="none"> -->
  <view class="shops-bar">
    <view class="shops-box"  @click="showDateSelect">
      <view class="content">
        <view class="titles">
          <text>自取时间</text>
        </view>
      </view>
      <view class="text" style="padding: 10rpx 30rpx;">{{ selfGetDate }}</view>
    </view>
    <!-- <van-icon name="arrow"/> -->
  </view>
<!-- </navigator> -->
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

<!-- <navigator url="/pages/add-note/index" hover-class="none"> -->
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
<!-- </navigator> -->
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
<nut-popup v-model:visible="showDateSelecter" position="bottom" >
  <nut-date-picker
    v-model="initDate"
    type="datetime"
    :min-date="min"
    :max-date="max"
    :three-dimensional="false"
    :formatter="formatter"
    @confirm="confirm"
  ></nut-date-picker>
</nut-popup>
</template>