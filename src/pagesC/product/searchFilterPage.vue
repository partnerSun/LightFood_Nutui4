<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,watch ,computed,  ref } from 'vue';
import Taro,{ useLoad } from '@tarojs/taro'
import { Minus,Plus,IconFont,Left ,Search2 ,Photograph ,Message   } from '@nutui/icons-vue-taro'
import { AtIcon,AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import '../../assets/iconfont/iconfont.css'
import './search.css'
import { useProductStore } from '../../store/index.js';
import { storeToRefs } from 'pinia'

// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})
const productStore = useProductStore();
const { quantities,allProductInfo } = storeToRefs(productStore)
const { incrementQuantity,decrementQuantity } = productStore


const data = reactive({
  items:[],
  ptypes:[]
})


const inputContentPostion=ref('center')

const inputValue=ref('')

const filteredProductsInfo = ref([]);



// useLoad(async () => {
//   try {
//     data.items = allProductInfo.value
//   } 
//   catch (err) {
//     console.error("商品信息获取失败", err)
//   }
// })


const onChange=(event)=> {
  inputValue.value=event.detail.value
  console.log('搜索框内容改变value', event.detail.value)
  let searchString = inputValue.value;
  filteredProductsInfo.value= allProductInfo.value.filter(item => 
    (item.Product && item.Product.includes(searchString)) || 
    (item.Ptype && item.Ptype.includes(searchString))
  );
  console.log('搜索结果', filteredProductsInfo.value)
}


const searchFilterContent = () => {
  let searchString = inputValue.value;
  console.log('过滤条件', inputValue.value)
  filteredProductsInfo.value= allProductInfo.value.filter(item => 
    (item.Product && item.Product.includes(searchString)) || 
    (item.Ptype && item.Ptype.includes(searchString))
  );
  console.log('搜索结果', filteredProductsInfo.value)
};



// 监视 quantities 的变化并同步到 localStorage
watch(quantities, (newQuantities) => {
  if (newQuantities) {
    Taro.setStorageSync('productQuantities', JSON.stringify(newQuantities));
  }
}, { deep: true });


</script>

<template>
<!-- <view style="display: flex;flex-direction: column;justify-content:space-between;"> -->
  <!-- 搜索框+商品信息 -->
  <view>
    <!-- <AtSearchBar
    actionName='搜索'
    :value="inputValue"
    @action-click="searchFilterContent"
    @change="onChange"
    style="width: 80%;margin: 20rpx auto;"
  /> -->
  <view class="custom-parent-search">
    <input 
      :value="inputValue"
      type="text" 
      placeholder="请输入" 
      :focus="true" 
      class="custom-search"
      confirmType="search"
      :holdKeyboard="true"
      @confirm="searchFilterContent"
      @input="onChange"
      >
    </input>
    <view style="width: 40px;margin: auto auto;line-height: normal;" @click="searchFilterContent">搜索</view>
  </view>
  <view v-for="product in filteredProductsInfo" :key="product.ID" style="margin-bottom: 10rpx;">
      <nut-card
        :img-url="product.Img"
        :title="product.Product"
        :price="product.OriginalPrice"
        :vip-price="product.CurrentPrice"
        class="actionsheet-shopping-card-class"
      >
        <template #footer> 
          <view style="width: 100%;">
            <view class="parent-button-class">
              <view class="minusbutton-class" >
                <Minus  @click="decrementQuantity(product.ID)" size="22px" />  
              </view>
              <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
              <view class="addbutton-class">
                <Plus @click="incrementQuantity(product.ID)" size="22px"/>
              </view>
            </view>
          </view>
        </template>
      </nut-card>
      <nut-divider style="width: 90%;margin: 0 auto 18rpx"/>
  </view>

  </view>

</template>

<style  lang="scss">

page {
  --nut-input-font-size: 24px;
  --nut-divider-line-height: 0.1px;
  --nut-divider-margin: 15px 10px;

  // --nut-card-left-border-radius:30rpx;
  // --nut-tabs-vertical-titles-width: 120rpx;
}


</style>