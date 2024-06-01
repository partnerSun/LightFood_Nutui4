<script setup>
import {ref,reactive,onMounted,toRefs} from 'vue';
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro' 
import contentData from '../../components/info.js'


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
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
  console.log('showDetail', id)
  Taro.navigateTo({
    url: '/pages/detail/index?id='+id,

  })
}

const upper = (e) => {
  console.log('upper:', e)
}

const lower = (e) => {
  console.log('lower:', e)
}

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
    :enhanced="enhanced"
    :showScrollbar="showScrollbar"
    >
      <view  class="parent_grid_view" >
        <view v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)" class="grid_content_view">
            <img :mode="imgMode" :src="item.image[0]" class="img-content"/>
            <!-- <view class="title">{{ item.title }}</view> -->
            <view class="title">
              <nut-ellipsis :content="item.title" direction="end" rows="2" >
              </nut-ellipsis>
            </view>
        </view>
      </view>
    </scroll-view>
  </view>

  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style scope>
.parent_grid_view{
  display: grid;
  grid-template-columns: 48% 49.5%; 
  gap: 15px;
  /* margin-left: 10px; */
}
/* .nut-grid-item__content {
  position: relative;
  padding-left: 5rpx;
  padding-right: 5rpx;
  padding-top: 5rpx;
  padding-bottom: 5rpx;
  width: 48vw;
} */


.img-content{
  margin-top: 15rpx;
  width: 100%; 
  height: 32vh; 
  border-radius: 10rpx;
  border: 1rpx solid rgb(231, 221, 221); 
}

.title{
  margin-top: 12rpx;
  margin-left: 17rpx;
  height: 40rpx;
  /* max-height: 80rpx; */
  text-align: left;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  /* font-weight: bold; */
  /* font-size: 30rpx; */
  font-weight: 600;
  font-size: 26rpx;
  line-height: 140%;
}

</style>
