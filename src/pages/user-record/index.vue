<script setup>
import './index.css'
import Taro,{useLoad}from '@tarojs/taro'
import { reactive, toRefs,ref } from 'vue';

// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})
const data=reactive({
    userInfo: {},
});

useLoad(async ()=>{
  data.userInfo=Taro.getStorageSync('userInfo')
 })
 const logs=reactive([
    {
        id:1,
        typeStr:'购买商品',
        dateAdd:'2021-01-01',
        score:100,
    },
    {
        id:2,
        typeStr:'购买商品',
        dateAdd:'2021-01-01',
        score:100,
    },
    {
        id:3,
        typeStr:'购买商品',
        dateAdd:'2021-01-01',
        score:100,
    },
 ])
 const {userInfo}=toRefs(data)
</script>

<template>
    <view class="my-integral-bar ">
        <view class="price-bar">
            <text>{{userInfo.score}}</text>p
        </view>
        <view class="go">我的积分</view>
    </view>

    <view class="blank"></view>

    <view v-if="!logs" class="no-orders">暂无积分记录</view>
    <block v-else>
        <block v-for="item in logs" :key="item.id">
            <view class="name-bar">
                <view class="name-box">
                <view class="name">{{ item.typeStr }}</view>
                <view class="time">{{ item.dateAdd }}</view>
                </view>
                <view class="price">{{ item.score }}</view>
            </view>
            <view class="blank"></view>
        </block>
    </block>
</template>