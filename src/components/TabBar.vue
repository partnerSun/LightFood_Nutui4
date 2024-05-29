<script  setup>
import { ref,reactive,onMounted,h,defineProps} from 'vue'
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
    path: '/pages/enjoy/index'
  },
  {
    title: '点单',
    icon: h(Shop3),
    path: '/pages/product/index',
  },
  {
    title: '我的',
    icon: h(My),
    path: '/pages/personal/index',
  },])


const props = defineProps({
  tabindex: Number,
  default: 0
})


let current = ref(0)

onMounted(() => {
  current.value = props.tabindex
})


const tabSwitch = (item, index) => {
  console.log(item, index)
  Taro.redirectTo({ url: List[index].path })
}
</script>

<template>
  <nut-tabbar 
  v-model="current" 
  bottom 
  safe-area-inset-bottom 
  placeholder
  @tab-switch="tabSwitch"
  >
    <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon">
    </nut-tabbar-item>
  </nut-tabbar>
</template>

  