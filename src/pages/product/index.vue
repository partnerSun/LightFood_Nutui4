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
const tabIndex=ref(2)
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
        <view v-for="product in getProductsByType(ptype)" :key="product.ID" style="margin-bottom: 20rpx;">
          <nut-card
            :img-url="product.Img"
            :title="product.Product"
            :price="product.OriginalPrice"
            :vip-price="product.CurrentPricee"
            :shop-desc="product.Descr"
            delivery="堂食"
            shop-name="xxx店铺名"
          >
            <template #footer> 自定义 </template>
          </nut-card>
        </view>
      </nut-tab-pane>
    </nut-tabs>
    <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style>
.nut-tabs.vertical>.nut-tabs__titles {
  padding: 0;
}

.nut-tab-pane {
  padding: 20rpx;
  /* margin-bottom: 20rpx; */
}
</style>