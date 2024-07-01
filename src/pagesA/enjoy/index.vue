<script setup>
import {ref,reactive,toRefs} from 'vue';
import { AtSearchBar } from 'taro-ui-vue3'
import { PlayStart } from '@nutui/icons-vue-taro'
import { AtIcon } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/icon.scss";
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

//  aspectFit
const imgMode=ref('scaleToFit')
// 启用 scroll-view 增强特性
const enhanced=ref(true)
// 滚动条显隐控制
const showScrollbar=ref(false)

const tabIndex=ref(1)



const showDetail = (id) => {
  Taro.navigateTo({
    url: '/pagesA/enjoy-detail/index?id='+id,
  })
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
    fixed
    style="width: 100%;margin: auto;"
  />
  <view style="width: 100%;height: 42px;background-color: white;"></view>
  <!-- 发布分享页 -->
  <view class="column-container">
    <view class="column-item" v-for="(item,index) in filteredSharesInfo" :key="index" @click="showDetail(item.id)">
      <view v-if="item.video && item.video.length > 0" class="center-content">
        <!-- <AtIcon value='play' size='30' color='white' class="play-icon"></AtIcon> -->
        <PlayStart color="white" size="28" class="play-icon"/>
        <image :mode="imgMode" :src="item.img[0]" class="column-image" lazyLoad/>
      </view>
      <view v-else class="center-content">
        <image :mode="imgMode" :src="item.img[0]" class="column-image" lazyLoad/>
      </view>
        <view class="column-text">{{ item.title }}</view>
    </view>
  </view>

  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style lang="less">

.column-container {
  column-count: 2; /* 设置列数 */
  column-gap: 10px; /* 列间距 */
  padding: 1px 5px 5px 5px;
  background-color: whitesmoke;
}

.column-item {
  display: inline-block; /* 必须使用 inline-block */
  width: 100%;
  margin:  0;
  break-inside: avoid; /* 防止列中断 */
  border: 0.1px solid white;
  border-radius: 8px;
  overflow: hidden;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 /* min-height: 360px;  最小高度以确保容器显示 */
 /*  background-color: #f0f0f0; 帮助调试，显示背景色 */
 background-color: white;
}

.column-image {
  width: 100%; /* 确保图片宽度适应容器 */
  height: 480px; /* 确保图片高度自适应 */
  display: block;
}

.column-text {
  font-family: "PingFang SC";
  padding: 0px 15px;
  margin: 15px auto;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 530;
  font-size: 28rpx;
  line-height: normal;
  font-style: normal;
  letter-spacing: 2px;
}

// 搜索栏
.at-search-bar__action {
  color: rgb(8, 187, 172);
  font-size: 14PX;
  background-color: white;
  opacity: 0;
}
  

.center-content{
  position: relative;
  display: flex;
}

.play-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 14px;
  top: 14px;
  // width: 20px;
  // height: 20px;
  // border-radius: 20px;
  // background-color: rgba(255, 255, 255, 0.8); 
}


</style>
