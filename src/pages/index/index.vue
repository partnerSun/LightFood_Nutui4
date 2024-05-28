<script setup>
import {ref,reactive,onMounted,toRefs} from 'vue';
// import TabBar from '../../components/TabBar.vue';
// import { Dongdong } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro' 


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

const contentData = reactive([
    { id: 1, image: 'http://light-food.wfzwrjx.cn/images/a.jpg', title: '巨巨巨……巨好吃，求你们去做！！' },
    { id: 2, image: 'http://light-food.wfzwrjx.cn/images/b.jpg', title: '济南真不缺浪漫的餐厅。。。' },
  ],
)
const showDetail = (id) => {
  console.log('showDetail', id)
  Taro.navigateTo({
    url: '/pages/index/detail',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function(id) {
        console.log(id)
      },
      someEvent: function(id) {
        console.log(id)
      }
    },
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    },
  })
}


</script>

<template>
  <view class="" hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search" style="width: 80%;margin: auto;"></nut-searchbar>

  </view>
  <view class="demo-list">
    <nut-list :list-data="data"  @scroll-bottom="onScrollBottom" >
      <nut-grid :column-num="2" :gutter="10" :border="false" :clickable="true" class="nut-grid-1">
        <nut-grid-item class="nut-grid-item-1" v-for="(item,index) in contentData" :key="index" @click="showDetail(item.id)">
            <img :src="item.image" class="nut-grid-content-1"/>
            <span style="margin-top: 10px;margin-left: 5px;">{{ item.title }}</span>
        </nut-grid-item>

      </nut-grid>
    </nut-list>
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
.nut-grid-item-11{
 /* box-sizing: border-box;  盒模型设置为border-box，确保宽度包括内边距和边框 */
  position: relative;
  /* border: 1px solid red; */
  padding-bottom:56.25%;
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
  height: 30vh; 
  border-radius: 15px;
  border: 1px solid rgb(231, 221, 221); 
}
</style>
