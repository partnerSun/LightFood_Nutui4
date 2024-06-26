<script setup>
import {ref,reactive,toRefs} from 'vue';
// import { Row, Col } from '@nutui/nutui-taro'
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro,{useLoad} from '@tarojs/taro' 
import contentData from '../../components/info.js'
import {sharesCheck} from '../../api/shares.js'


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

const data=reactive({
  sharesInfo:{}
})
useLoad(async()=>{
  let sharesCheckRes=await sharesCheck()
  data.sharesInfo=sharesCheckRes.data.data.items
  console.log("分享内容：",data.sharesInfo)
})
const imgMode=ref('scaleToFit')
// 启用 scroll-view 增强特性
const enhanced=ref(true)
// 滚动条显隐控制
const showScrollbar=ref(false)

const tabIndex=ref(1)
const val = ref('')

const search = (text) => {
  console.log('search', text)
}



const showDetail = (id) => {
  // console.log('showDetail', id)
  Taro.preload({
    sharesInfo: data.sharesInfo
  });
  Taro.navigateTo({
    url: '/pages/enjoy-detail/index?id='+id,
  })
}

const upper = (e) => {
  console.log('upper:', e)
}

const lower = (e) => {
  console.log('lower:', e)
}

const {sharesInfo}=toRefs(data)
</script>

<template>
  <!-- 搜索框 -->
  <view hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search" style="width: 80%;margin: auto;"></nut-searchbar>
  </view>
  <!-- 发布分享页 -->
  <view style="background-color: whitesmoke;">
    <scroll-view 
    scrollY
    @scrolltoupper="upper"
    @scrolltolower="lower" 
    :enhanced="enhanced"
    :showScrollbar="showScrollbar"
    >
      <!-- <view  class="parent_grid_view" >
        <view v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)" class="grid_content_view">
            <img :mode="imgMode" :src="item.image[0]" class="img-content"/>
            <view class="title">
              <nut-ellipsis :content="item.title" direction="end" rows="2" >
              </nut-ellipsis>
            </view>
        </view>
      </view> -->
      <nut-row :gutter="4">
        <nut-col :span="12" v-for="(item,index) in sharesInfo" :key="index" @click="showDetail(item.id)" >
          <view class="block_content_view">
            <img :mode="imgMode" :src="item.img[0]" class="img-content"/>
            <view class="title">
              <text class="title-content">{{ item.title }}</text>
            </view>
          </view>
        </nut-col>
      </nut-row>
    </scroll-view>
  </view>

  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style lang="less">
.parent_grid_view{
  display: grid;
  grid-template-columns: 49% 49.5%; 
  gap: 15px;
  /* margin-left: 10px; */
}

.block_content_view{
  background-color: #FFFFFF;
  border-radius: 8rpx;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
  // overflow: hidden;
  // margin-left: 5rpx;
  margin-top: 10rpx;
  padding-bottom: 16rpx;
  .img-content{
    /* margin-top: 0rpx; */
    width: 100%; 
    height: 480rpx; 
    border-radius: 8rpx 8rpx 0 0;
    /* border: 1rpx solid rgb(231, 221, 221);  */
  }
  .title{
    // display: flex;
    color: #000;
    font-family: "PingFang SC";
    padding: 0px 20rpx;
    margin-bottom: 5rpx;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 520;
    font-size: 26rpx;
    line-height: normal;
    font-style: normal;
    letter-spacing: 2rpx;
    }
}
</style>
