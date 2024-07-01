<script setup>
import { ref, reactive,toRefs,onBeforeMount} from 'vue'
// import contentData from '../../components/info.js'
import Taro, { useLoad } from '@tarojs/taro' 
import { IconFont } from '@nutui/icons-vue-taro'
import { Share, Star,Follow } from '@nutui/icons-vue-taro'
import {sharesCheck} from '../../api/shares.js'



// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})

let id = ref(0)
const imgMode=ref('aspectFill')

let starActiveColor = ref('#fa2c19')
let starUnActiveColor = ref('black')
let CollectActiveColor = ref('#fa2c19')
let CollectUnActiveColor = ref('black')
let starActiveStatus=ref(false)
let collectActiveStatus=ref(false)

const data = reactive({
    result:{},
    content:'',
})


// onBeforeMount(async()=>{
//   // 获取所有的分享信息
//   let sharesCheckRes=await sharesCheck()
//   let sharesInfo=sharesCheckRes.data.data.items
//   // 获取父组件传过来的参数
//   const params = Taro.getCurrentInstance().router.params;
//   id.value = Number(params.id); // 确保 id 是数字类型  
//   // 过滤出当前id对应的分享信息
//   data.result= sharesInfo.find(item => item.id === id.value);
  
//   data.content=data.result.content
//   console.log("data",data)
// })

useLoad(async()=>{
    // 获取所有的分享信息
    let sharesCheckRes=await sharesCheck()
  let sharesInfo=sharesCheckRes.data.data.items
  // 获取父组件传过来的参数
  const params = Taro.getCurrentInstance().router.params;
  id.value = Number(params.id); // 确保 id 是数字类型  
  // 过滤出当前id对应的分享信息
  data.result= sharesInfo.find(item => item.id === id.value);
  
  data.content=data.result.content
  // console.log("data",data)
  // 显示分享菜单
  Taro.showShareMenu({
    withShareTicket: true,
    showShareItems:['shareAppMessage', 'shareTimeline'],
    success: function (res) {
      console.log('显示分享菜单成功', res);
    },
    fail: function (err) {
      console.log('显示分享菜单失败', err);
    },
  })
})

const {result,content} = toRefs(data)


const CheckedCached=(btype)=>{
  // 
    if (btype==1){
      starActiveStatus.value=!starActiveStatus.value
    }else if (btype==2){
      collectActiveStatus.value=!collectActiveStatus.value
    }

}



const share = () => {
  console.log('分享')
  // Taro.showShareMenu({
  //   withShareTicket: true,
  //   showShareItems:['shareAppMessage', 'shareTimeline'],
  //   // menus: ['shareAppMessage', 'shareTimeline'],
  //   success: function (res) {
  //     console.log('显示分享菜单成功', res);
  //   },
  //   fail: function (err) {
  //     console.log('显示分享菜单失败', err);
  //   }
  // })

  // Taro.updateShareMenu({
  //     withShareTicket: true,
  //     // isUpdatableMessage: true,
  //     // activityId: '活动ID',
  //     targetState: 0,
  //     templateInfo: {
  //       parameterList: [{
  //         name: 'member_count',
  //         value: '1'
  //       }, {
  //         name: 'room_limit',
  //         value: '5'
  //       }]
  //     }
  //   });
}


const handleWaiting=(e)=>{
  console.log("视频缓冲",e)
}
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
      <video
        v-if="result.video && result.video.length > 0"
        id="video"
        :src="result.video[0]"
        :title="result.title"
        play-btn-position="bottom"
        :enable-play-gesture="true"
        :page-gesture="true"
        :show-mute-btn="true"
        initial-time="0"
        :controls="true"
        :autoplay="false"
        @waiting="handleWaiting"
        object-fit="contain"
        style="width: 100%; max-height: 80vh;"
      ></video>
      <!-- 媒体展示 -->
      <nut-swiper
        v-else
        :init-page="0"
        :auto-play="3000"
        pagination-visible
        pagination-color="#426543"
        pagination-unselected-color="#808080"
        style="width: 100vw;margin: auto;"
      >
        <nut-swiper-item v-for="(item, index) in result.img" :key="index" style="height: 60vh;">
          <image :mode='imgMode' style="height: 100%; width: 100%" :src="item" draggable="false" ></image>
        </nut-swiper-item>
      </nut-swiper>
    
      <!-- 标题和文字内容 -->
      <view>
        <view class="bottom_title">
          {{ result.title }}
        </view>
        
        <view class="bottom_content">
          {{ content }}
        </view>
        <view style="height: 300rpx;"></view>
      </view>
    </scroll-view>
    <!-- 底部按钮 -->

    <view class="bottom-bar">
      <!-- <Share /> -->
      <IconFont name="share" size="20" color="#000000" @click="share"></IconFont>
      <share></share>
      <IconFont name="star-fill-n" v-if="starActiveStatus" :color="starActiveColor"  @click="CheckedCached(1)" size="23"></IconFont>
      <IconFont name="star" v-else :color="starUnActiveColor" @click="CheckedCached(1)" size="23"></IconFont>
      <IconFont name="heart-fill" v-if="collectActiveStatus" :color="CollectActiveColor"@click="CheckedCached(2)" size="24"></IconFont>
      <IconFont name="heart1" v-else :color="CollectUnActiveColor"@click="CheckedCached(2)" size="24"></IconFont>

    </view>
  </view>
  </template>



<style scope>
.bottom_title {
  /* width: 96%; */
  /* margin: auto; */
  padding: 20px 15px 5px 15px;
  /* margin: 20rpx auto; */
  text-align: left;
  font-weight: 600;
  font-size: 32px;
  /* line-height: 150%; */
}

.bottom_content {
  /* margin: auto; */
  padding: 10px 20px;
  font-weight: 400;
  font-size: 30rpx;
  line-height:normal;
  font-style: normal;
  letter-spacing: 2px;
  /* line-height: 150%; */
}
.bottom-bar{
  display: grid;
  justify-items:center;
  align-items:center;
  grid-template-columns: 50% 20% 30%;
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 10%;
  background-color: white;
}
.nut-icon {
  --animate-duration: 1s;
  --animate-delay: 0s;
}
</style>