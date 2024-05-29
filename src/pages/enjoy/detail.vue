<script setup>
import { ref, reactive,toRefs,onBeforeMount} from 'vue'
import contentData from './info.js'
import Taro from '@tarojs/taro' 

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


// const showinfo =()=>{
//     console.log("contentData:",contentData)
//     console.log("result:",result)
// }

const swiperRef = ref()
const handlePrev = () => {
  swiperRef.value?.prev()
}
const handleNext = () => {
  swiperRef.value?.next()
}
const {result,content} = toRefs(data)

</script>

<template>
<!-- 媒体展示 -->
<view class="swiper-demo">
    <!-- 这是首页某个信息的详情页 -->
    <!-- {{ result }} -->
    <!-- <nut-button type="primary" @click="showinfo">Primary</nut-button> -->
    <nut-swiper
     :init-page="0"
     :auto-play="3000"
     pagination-visible
     pagination-color="#426543"
     pagination-unselected-color="#808080"
     style="width: 100vw;margin: auto;"
    >
      <nut-swiper-item v-for="(item, index) in result.image" :key="index" style="height: 60vh;">
        <image :mode='aspectFill' style="height: 100%; width: 100%" :src="item" draggable="false" ></image>
      </nut-swiper-item>
    </nut-swiper>
</view>
<!-- 标题和内容 -->
<view>
    <span style="color: black;font-size: 16px;margin-left: 15px;margin-top: 20px;font-weight: bold;">
     {{ result.title }}
    </span>
    <nut-cell>
      <nut-ellipsis :content="content" direction="end" rows="6" expand-text="展开" collapse-text="收起" style="color: black;">
        <template #content>
          <b>{{ content }}</b>
        </template>
      </nut-ellipsis>
    </nut-cell>
</view>
</template>

<style scoped>
.swiper-demo {
  position: relative;
}
.swiper-btns {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
.swiper-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>