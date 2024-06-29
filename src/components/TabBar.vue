<script  setup>
import { ref,reactive,onBeforeMount,h,defineProps} from 'vue'
import { Home, Shop3, Follow, My } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro' 



const List = reactive([
  {
    title: '首页',
    icon: h(Home),
    path: '/pages/index/index'
  },
  {
    title: '工艺',
    icon: h(Follow),
    path: '/pagesA/enjoy/index'
  },
  {
    title: '商品',
    icon: h(Shop3),
    path: '/pagesC/product/index',
  },
  {
    title: '我的',
    icon: h(My),
    path: '/pagesB/personal/index',
  },])


const props = defineProps({
  tabindex:{
    Number,
    required: true,
    default: 0
  } 
  
})


let current = ref(0)

onBeforeMount(() => {
  current.value = props.tabindex
})


const tabSwitch = (item, index) => {
  // console.log(item, index)
  Taro.redirectTo({ url: List[index].path })
}
</script>

<template>
  <!-- <span>tabbar Fallthrough attribute: {{ $attrs }}</span> -->
  <view>
    <nut-tabbar 
    v-model="current" 
    bottom 
    safe-area-inset-bottom
    active-color="#63DBD4"
    placeholder
    @tab-switch="tabSwitch"
    >
      <nut-tabbar-item 
      v-for="(item, index) in List" 
      :key="index"
      :tab-title="item.title"
      :icon="item.icon"
      >
      </nut-tabbar-item>
    </nut-tabbar>
  </view>

</template>

<style>
page {
  /* 底部tabar的高度 */
  --nut-tabbar-height: 100px;
}
</style>