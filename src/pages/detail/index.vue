<script setup>
import { h,ref, reactive,toRefs,onBeforeMount} from 'vue'
import contentData from '../../components/info.js'
import Taro from '@tarojs/taro' 
import { IconFont } from '@nutui/icons-vue-taro'
import { Share, Star,Follow } from '@nutui/icons-vue-taro'

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


const CheckedCached=(btype)=>{
  // 
    if (btype==1){
      starActiveStatus.value=!starActiveStatus.value
    }else if (btype==2){
      collectActiveStatus.value=!collectActiveStatus.value
    }

}

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

const share=()=>{
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
    <!-- 底部按钮 -->

    <view class="bottom-bar">
      <!-- <Share /> -->
      <IconFont name="share" size="20" color="#000000" @click="share"></IconFont>
      <IconFont name="star-fill-n" v-if="starActiveStatus" :color="starActiveColor"  @click="CheckedCached(1)" size="23"></IconFont>
      <IconFont name="star" v-else :color="starUnActiveColor" @click="CheckedCached(1)" size="23"></IconFont>
      <IconFont name="heart-fill" v-if="collectActiveStatus" :color="CollectActiveColor"@click="CheckedCached(2)" size="24"></IconFont>
      <IconFont name="heart1" v-else :color="CollectUnActiveColor"@click="CheckedCached(2)" size="24"></IconFont>

    </view>
  </view>
  </template>



<style scope>
.bottom_title {
  width: 96%;
  margin: 20rpx auto;
  text-align: left;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 600;
  font-size: 26rpx;
  line-height: 140%;
}

.bottom_content {
  width: 96%;
  /* margin-top: 40rpx; */
  margin: 20rpx auto;
  font-weight: 400;
  font-size: 24rpx;
  line-height: 150%;
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