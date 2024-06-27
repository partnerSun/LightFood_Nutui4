<script setup>
import {ref,reactive,toRefs} from 'vue';
import { AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
// import { Row, Col } from '@nutui/nutui-taro'
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro,{useLoad} from '@tarojs/taro' 
// import contentData from '../../components/info.js'
import {sharesCheck} from '../../api/shares.js'


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})
// 保存初始化分享信息
const data=reactive({
  sharesInfo:{}
})
// 保存过滤后的分享信息
const filteredSharesInfo = ref([]);
useLoad(async()=>{
  let sharesCheckRes=await sharesCheck()
  data.sharesInfo=sharesCheckRes.data.data.items
  filteredSharesInfo.value=data.sharesInfo
  // console.log("分享内容：",data.sharesInfo)
})
const imgMode=ref('scaleToFit')
// 启用 scroll-view 增强特性
const enhanced=ref(true)
// 滚动条显隐控制
const showScrollbar=ref(false)

const tabIndex=ref(1)



const showDetail = (id) => {
  // console.log('showDetail', id)
  // Taro.preload({
  //   sharesInfo: data.sharesInfo
  // });
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





// 搜索框
const inputValue=ref('')

const onChange=(value)=> {
  inputValue.value=value
  // console.log('搜索框内容改变value', value)
  let searchString = inputValue.value;
  filteredSharesInfo.value= data.sharesInfo.filter(item => 
    (item.title && item.title.includes(searchString)) || 
    (item.content && item.content.includes(searchString))
  );
  // console.log('搜索结果', filteredSharesInfo.value)
}


const searchFilterContent = () => {
  let searchString = inputValue.value;
  // console.log('过滤条件', inputValue.value)
  filteredSharesInfo.value= data.sharesInfo.filter(item => 
    (item.title && item.title.includes(searchString)) || 
    (item.content && item.content.includes(searchString))
  );
  // console.log('搜索结果', filteredSharesInfo.value)
};
</script>

<template>
  <!-- 搜索框 -->
  <AtSearchBar
    actionName='搜索'
    :value="inputValue"
    @action-click="searchFilterContent"
    @change="onChange"
    style="width: 90%;margin: 0 auto;"
  />
  <!-- 发布分享页 -->
  <view style="background-color: whitesmoke;">
    <scroll-view 
      scrollY
      @scrolltoupper="upper"
      @scrolltolower="lower" 
      :enhanced="enhanced"
      :showScrollbar="showScrollbar"
    >
      <nut-row :gutter="4">
        <nut-col :span="12" v-for="(item,index) in filteredSharesInfo" :key="index" @click="showDetail(item.id)" >
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
// 搜索栏
.at-search-bar__action {
  color: black;
  font-size: 14PX;
  background-color: white;
  opacity: 0;
}
  
.block_content_view{
  background-color: #FFFFFF;
  border-radius: 8rpx;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
  // overflow: hidden;
  // margin-left: 5rpx;
  margin-top: 4rpx;
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
