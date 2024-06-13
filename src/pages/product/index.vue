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
  items:[],
  ptypes:[]
})

const activeTab = ref('')
useLoad(async () => {
  try {
    const info = await productCheck()
    const { items } = info.data.data || {}

    if (items && items.length > 0) {
      data.items = items
      data.ptypes = [...new Set(items.map(item => item.Ptype))]
      activeTab.value = items[0].Ptype
      console.log("商品信息获取成功", data.items)
      console.log("商品类型获取成功", data.ptypes)
    } else {
      console.log("token过期或没有商品信息")
    }
  } 
  catch (err) {
    console.error("商品信息获取失败", err)
  }
})


const {items,ptypes}=toRefs(data)

// 根据 Ptype 获取相应的商品
const getProductsByType = (ptype) => {
  return data.items.filter(product => product.Ptype === ptype)
}
</script>

<template>
    <!-- <TabBar></TabBar> -->
    <nut-tabs v-model="activeTab" direction="vertical" title-scroll  name="productTabs">
      <nut-tab-pane v-for="ptype in ptypes" :key="ptype" :title="ptype" :pane-key="ptype">
        <view v-for="product in getProductsByType(ptype)" :key="product.ID">
          
          <h3>{{ product.Product }}</h3>
          <p>Original Price: {{ product.OriginalPrice }}</p>
          <p>Discount: {{ product.Discount }}</p>
          <p>Current Price: {{ product.CurrentPrice }}</p>
        </view>
      </nut-tab-pane>
    </nut-tabs>
    <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style>
.nut-tabs.vertical>.nut-tabs__titles {
  padding: 0;
}

</style>