<script setup>
import { ref, reactive,toRefs,onBeforeMount} from 'vue'
import contentData from '../../components/info.js'
import Taro from '@tarojs/taro' 


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

let id = ref(0)

const data =reactive({
    result:{},
    content:''
})


onBeforeMount(()=>{
    const params = Taro.getCurrentInstance().router.params;
    id.value = Number(params.id); // 确保 id 是数字类型
    data.result = contentData.find(item => item.id === id.value);
    data.content=data.result.info
})


const {result,content} = toRefs(data)
const imgMode=ref('aspectFill')
</script>

<template>
  <view >
    <!-- 滚动条 -->
    <scroll-view 
      :scroll-y="true" 
      style="height: 100vh;" 
      @scrolltoupper="upper"
      @scrolltolower="lower" 
      :enhanced="true"
      :showScrollbar="false"
      >
      
      <!-- 媒体展示 -->
      <nut-swiper
        :init-page="0"
        :auto-play="3000"
        pagination-visible
        pagination-color="#426543"
        pagination-unselected-color="#808080"
        style="width: 100vw;margin: auto;"
      >
        <nut-swiper-item v-for="(item, index) in result.image" :key="index" style="height: 60vh;">
          <image :mode='imgMode' style="height: 100%; width: 100%" :src="item" draggable="false" ></image>
        </nut-swiper-item>
      </nut-swiper>
    
      <!-- 标题和文字内容 -->
      <view>
        <view class="bottom_title">
         {{ result.title }}
        </view>
        
        <view class="bottom_content">
          <nut-ellipsis :content="content" direction="end" rows="11" expand-text="展开" collapse-text="收起">
          </nut-ellipsis>
        </view>
        
        <view style="height: 100px;"></view>
      </view>
    </scroll-view>
  </view>
  </template>


<style scope>
.bottom_title {
  width: 96%;
  margin: 20rpx auto;
  text-align: left;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: bold;
}

.bottom_content {
  width: 96%;
  /* margin-top: 40rpx; */
  margin: 20rpx auto;
}

</style>