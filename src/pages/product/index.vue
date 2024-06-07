<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs, onMounted, ref } from 'vue';
import { useLoad } from '@tarojs/taro'
import {categoryData} from './categoryData.js';
import {productCheck} from '../../api/product.js'

// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})
const data = reactive({
  items:{}
})

useLoad(()=>{
  data.items=productCheck()
})

const tabIndex=ref(2)
const value = ref('1')
const list = new Array(5).fill(0).map((_, index) => index + 1)

const {items}=toRefs(data)
</script>

<template>
    <!-- <TabBar></TabBar> -->
    <nut-tabs v-model="value" direction="vertical" title-scroll  name="tabName">
      <nut-tab-pane v-for="item in list" :key="item" :title="`Tab ${item}`" :pane-key="item">
        Content {{ item }}
      </nut-tab-pane>
    </nut-tabs>
<view>
  {{ items }}
</view>
    <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style>
.nut-tabs.vertical>.nut-tabs__titles {
  padding: 0;
}

</style>