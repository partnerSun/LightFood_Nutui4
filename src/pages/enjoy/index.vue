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
const imgMode=ref('aspectFill')
const data = ref(new Array(5).fill(0));

onMounted(() => {
  data.value = data.value.map((_, index) => index + 1);
});

// const onScrollBottom = () => {
//   let arr = new Array(5).fill(0);
//   const len = data.value.length;
//   data.value = data.value.concat(arr.map((_, index) => len + index + 1));
// };


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

// const scroll = (e) => {
//   console.log('scroll:', e)
// }

const scrollTop=ref(0)
// const toView=ref('demo2')
</script>

<template>
  <!-- <span>enjoy Fallthrough attribute: {{ $attrs }}</span> -->
  <view class="" hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search" style="width: 80%;margin: auto;"></nut-searchbar>

  </view>
  <view >
    <scroll-view 
    :scroll-y="true" 
    style="height: 80vh;" 
    @scrolltoupper="upper"
    @scrolltolower="lower" 
    :scroll-top="scrollTop"
    >
      <nut-grid :column-num="2" :gutter="10" :border="false" :clickable="true" class="nut-grid-1">
        <nut-grid-item class="nut-grid-item-1" v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)">
            <img :mode='imgMode' :src="item.image[0]" class="nut-grid-content-1"/>
            <span style="margin-top: 15px;margin-left: 10px;">{{ item.title }}</span>
        </nut-grid-item>
      </nut-grid>
    </scroll-view>
  </view>

  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style scope>

.nut-grid-1{
  /* margin: 0 -5px; */
  /* padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px; */
  /* padding: 10px; */

}
.nut-grid-item-1{
  /* height: 45vh;  */
  /* position: relative; */
  /* border: 1px solid red; */
  /* padding-bottom:56.25%; */
  /* margin-right: 10px; */

}

.nut-grid-content-11{
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  width: 90%; 
  height: 85%; 
  border-radius: 15px;
}

.nut-grid-content-1{
  width: 100%; 
  height: 31vh; 
  border-radius: 15px;
  border: 1px solid rgb(231, 221, 221); 
}
</style>
