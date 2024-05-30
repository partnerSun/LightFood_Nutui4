<script setup>
import {ref,reactive,onMounted,toRefs} from 'vue';
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro' 
import contentData from './info.js'

defineOptions({
  inheritAttrs: false
})

const tabIndex=ref(1)
const val = ref('')
const search = (text) => {
  console.log('search', text)
}

const imgMode=ref('scaleToFit')
// const data = ref(new Array(5).fill(0));

// onMounted(() => {
//   data.value = data.value.map((_, index) => index + 1);
// });



const showDetail = (id) => {
  console.log('showDetail', id)
  Taro.navigateTo({
    url: '/pages/enjoy/detail?id='+id,

  })
}

const upper = (e) => {
  console.log('upper:', e)
}

const lower = (e) => {
  console.log('lower:', e)
}


const scrollTop=ref(0)
// const toView=ref('demo2')
</script>

<template>
  <!-- 搜索框 -->
  <view class="" hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search" style="width: 80%;margin: auto;"></nut-searchbar>
  </view>
  <!-- 发布分享页 -->
  <view >
    <scroll-view 
    :scroll-y="true" 
    style="height: 80vh;" 
    @scrolltoupper="upper"
    @scrolltolower="lower" 
    :scroll-top="scrollTop"
    >
      <nut-grid :column-num="2" :gutter="5" :border="false" :clickable="true" >
        <nut-grid-item v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)">
            <img :mode="imgMode" :src="item.image[0]" class="nut-grid-content-1"/>
            <!-- <view class="title">{{ item.title }}</view> -->
            <nut-ellipsis direction="start" :content="item.title"></nut-ellipsis>
        </nut-grid-item>
      </nut-grid>
    </scroll-view>
  </view>

  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style scope>
.nut-grid-item__content {
  padding-left: 5rpx;
  padding-right: 5rpx;
  padding-top: 10rpx;
  padding-bottom: 5rpx;
  width: 48vw;
  /* height: 100vh;  */
  /* max-height: 40vh;  */
}

.title{
  /* position: absolute; */
  margin-top: 20rpx;
  /* margin-bottom: 10rpx; */
  /* box-sizing: border-box; */
  text-align: left;
  height: 60rpx;
  max-height: 60rpx;
}

.nut-grid-content-1{
  width: 100%; 
  height: 32vh; 
  border-radius: 15rpx;
  border: 1rpx solid rgb(231, 221, 221); 
}

</style>
