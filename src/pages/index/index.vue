<script setup>
import {ref,reactive,onMounted,toRefs} from 'vue';
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro' 
import contentData from './info.js'


const val = ref('')
const search = (text) => {
  console.log('search', text)
}

const data = ref(new Array(5).fill(0));

onMounted(() => {
  data.value = data.value.map((_, index) => index + 1);
});

const onScrollBottom = () => {
  let arr = new Array(5).fill(0);
  const len = data.value.length;
  data.value = data.value.concat(arr.map((_, index) => len + index + 1));
};

// const contentData = reactive([
//     { id: 1, image: 'http://light-food.wfzwrjx.cn/images/a.jpg', title: '巨巨巨……巨好吃，求你们去做！！', info:'从前，一个农夫有两个水罐，一个很完好无损，一个有一条裂缝。农夫每次挑水，完好的水罐总能把水从远远的小溪运到主人家，而有裂缝的水罐回到主人家时往往只有关罐水。' },
//     { id: 2, image: 'http://light-food.wfzwrjx.cn/images/b.jpg', title: '真不缺浪漫的餐厅。。。', info:'小猫跟着妈妈去小兔子家做客,兔子妈妈准备了很多丰富的食物来招待小猫,到了吃午饭的时间,猫妈妈和小猫被兔妈妈留下来一起吃午餐。' },
//   ],
// )
const showDetail = (id) => {
  console.log('showDetail', id)
  Taro.navigateTo({
    url: '/pages/index/detail?id='+id,
    // events: {
    //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //   acceptDataFromOpenedPage: function(data) {
    //     console.log("首页event",data)
    //   },
    //   someEvent: function(data) {
    //     console.log(data)
    //   }
    // },
    // success: function (res) {
    //   // 通过eventChannel向被打开页面传送数据
    //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    // },
  })
}

const upper = (e) => {
  console.log('upper:', e)
}

const lower = (e) => {
  console.log('lower:', e)
}

const scroll = (e) => {
  console.log('scroll:', e)
}

const scrollTop=ref(0)
const toView=ref('demo2')
</script>

<template>
  <view class="" hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search" style="width: 80%;margin: auto;"></nut-searchbar>

  </view>
  <view class="demo-list">
    <!-- <nut-list :list-data="data"  @scroll-bottom="onScrollBottom" >
      <nut-grid :column-num="2" :gutter="10" :border="false" :clickable="true" class="nut-grid-1">
        <nut-grid-item class="nut-grid-item-1" v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)">
            <img :src="item.image[0]" class="nut-grid-content-1"/>
            <span style="margin-top: 15px;margin-left: 10px;">{{ item.title }}</span>
        </nut-grid-item>
      </nut-grid>
    </nut-list> -->
    <scroll-view 
    :scroll-y="true" 
    style="height: 85vh;" 
    @scrolltoupper="upper"
    @scrolltolower="lower" 
    :scroll-top="scrollTop"
    >
      <nut-grid :column-num="2" :gutter="10" :border="false" :clickable="true" class="nut-grid-1">
        <nut-grid-item class="nut-grid-item-1" v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)">
            <img :src="item.image[0]" class="nut-grid-content-1"/>
            <span style="margin-top: 15px;margin-left: 10px;">{{ item.title }}</span>
        </nut-grid-item>
      </nut-grid>
    </scroll-view>
  </view>

  <TabBar :tabindex=0></TabBar>
</template>

<style>
/* .demo-list .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  height: 150px;
  background-color: #f4a8b6;
  border-radius: 10px;
} */
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
