<script setup>
import { reactive,toRefs ,ref} from 'vue';
import Taro,{useLoad}from '@tarojs/taro'
import {processPhonerWorkflow} from '../../utils/decryptPhone.js'
import {updateVipInfoApi,getVipUserInfoApi} from '../../api/user.js'
import './index.css';
import {encryptedStoreData,decodeRetrieveData} from '../../utils/localDataProcess.js'
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
  // data.userInfo=Taro.getStorageSync('userInfo')
  data.userInfo = await decodeRetrieveData('userInfo')
  data.birthday = data.userInfo.birthday
 })

const modifyUserInfo=async()=>{
  // data.userInfo=Taro.getStorageSync('userInfo')
  let tdata=reactive({
    id:data.userInfo.id,
    birthday:data.birthday
  })
  Taro.showLoading({
      title: '修改中...',
      mask: true,
  })
  // console.log("修改的会员信息",'修改会员信息')
  let updateVipInfoRes = await updateVipInfoApi(tdata)
  // console.log("updateVipInfoRes",updateVipInfoRes)
  if (updateVipInfoRes.data.status==200){
    	//查询并保存会员信息至本地缓存
	  let newUserInfo = await getVipUserInfoApi(data.userInfo.id)
    data.userInfo=newUserInfo.data.items
	  // Taro.setStorageSync('userInfo', data.userInfo)
    await encryptedStoreData('userInfo', data.userInfo)
    
    //   使用avigateBack不会刷新
    Taro.redirectTo({
      url: '/pagesB/personal/index'
    });

    Taro.showToast({
      title: updateVipInfoRes.data.message,
      icon:'success',
    })
    Taro.hideLoading()

  }else{
    Taro.hideLoading()
    Taro.showToast({
      title: updateVipInfoRes.data.message,
      icon: 'error',
    })
  }
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
  if (!data.userInfo.birthday || data.userInfo.birthday=='0001-01-01'){
    showBirthday.value=true
  }
}
const updatePhone=async(e)=>{
  await processPhonerWorkflow(e)
}

// 同步微信数据
const vipSign=()=>{
  Taro.navigateTo({
      url: '/pages/login/vipSignIn'
  })
}
const {birthday,userInfo}=toRefs(data)
</script>

<template>
<view class="sync-bar">
  <view class="sync-box">
    <view class="again-sync">再次同步</view>
    <view class="weixin-sync">与微信同步会员信息</view>
  </view>
  <image mode='aspectFill' class='go' :src='icon_font_solid_1_2x'>1231231</image>
  <button @click="vipSign"></button>
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
  <view class="content" @click="updatebirthday"> {{ birthday ? birthday : '保存后不可再次修改' }} </view>
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