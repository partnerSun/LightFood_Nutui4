<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,watch ,computed,  ref } from 'vue';
import Taro,{ useLoad } from '@tarojs/taro'
import { Minus,Plus,IconFont,Left ,Search2 ,Photograph ,Message   } from '@nutui/icons-vue-taro'
import { AtIcon,AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import '../../assets/iconfont/iconfont.css'
import './search.css'


// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})


const data = reactive({
  items:[],
  ptypes:[]
})


const inputContentPostion=ref('center')

const inputValue=ref('')

const filteredProductsInfo = ref([]);

// 从本地缓存中加载商品数量
const loadQuantities = () => {
  const savedQuantities = Taro.getStorageSync('productQuantities');
  // console.log("savedQuantities ",savedQuantities )
  return savedQuantities ? JSON.parse(savedQuantities) : {};
};
// 
const quantities = ref(loadQuantities());
// 初始化商品列表，未选择的商品初始数量设为0
const initQuantitiesValue=()=>{
  data.items.forEach(product => {
  if (!(product.ID in quantities.value)) {
    quantities.value[product.ID] = 0;
  }
});
}

useLoad(async () => {
  try {
    const items = Taro.getCurrentInstance().preloadData.productInfo;
    console.log('预加载的数据:', items);
    if (items && items.length > 0) {
      data.items = items
      // data.ptypes = [...new Set(items.map(item => item.Ptype))]
      // console.log("商品信息获取成功", data.items)
      // console.log("商品类型获取成功", data.ptypes)
      // filteredProductsInfo.value = data.items
      initQuantitiesValue()
    } else {
      console.log("token过期或没有商品信息")
    }
  } 
  catch (err) {
    console.error("商品信息获取失败", err)
  }
})






const onChange=(value)=> {
  inputValue.value=value
  // console.log('搜索框内容改变value', value)
  let searchString = inputValue.value;
  filteredProductsInfo.value= data.items.filter(item => 
    (item.Product && item.Product.includes(searchString)) || 
    (item.Ptype && item.Ptype.includes(searchString))
  );
  console.log('搜索结果', filteredProductsInfo.value)
}


const searchFilterContent = () => {
  let searchString = inputValue.value;
  // console.log('过滤条件', inputValue.value)
  filteredProductsInfo.value= data.items.filter(item => 
    (item.Product && item.Product.includes(searchString)) || 
    (item.Ptype && item.Ptype.includes(searchString))
  );
  console.log('搜索结果', filteredProductsInfo.value)
};




// 增加商品数量
const incrementQuantity = (id) => {
  quantities.value[id]++;
};

// 减少商品数量
const decrementQuantity = (id) => {
  if (quantities.value[id] > 0){
    quantities.value[id]--
  }else {
  };
};

// 监视 quantities 的变化并同步到 localStorage
watch(quantities, (newQuantities) => {
  if (newQuantities) {
    // console.log("quantities", quantities.value);
    Taro.setStorageSync('productQuantities', JSON.stringify(newQuantities));
    // let currentProductQuantities = newQuantities;
    // console.log("商品数量变化", currentProductQuantities);
  }
}, { deep: true });


// 过滤商品数量>0的商品
// 返回 1. 由商品id组成的数组 2. 结算商品总数量
const filterProductQuantities = (items, quantities) => {
  const filteredIds = Object.keys(quantities.value).filter(id => quantities.value[id] > 0);
  const filteredItems =items.filter(item => filteredIds.includes(item.ID));
  const totalQuantity = filteredIds.reduce((total, id) => total + parseInt(quantities.value[id], 10), 0);
  return {
    filteredIds: filteredItems,
    totalQuantity: totalQuantity
  };
};

// 计算并返回商品数量>0的商品和商品总数量,用于购物车显示
const filteredProducts = computed(() => {
  const  { filteredIds, totalQuantity } = filterProductQuantities(filteredProductsInfo.value, quantities);
  return {
    filteredIds: filteredIds, //商品ID的数组
    totalQuantity: totalQuantity //结算商品的总数量
  };
});



</script>

<template>
<!-- <view style="display: flex;flex-direction: column;justify-content:space-between;"> -->
  <!-- 搜索框+商品信息 -->
  <view>
    <AtSearchBar
    actionName='搜索'
    :value="inputValue"
    @action-click="searchFilterContent"
    @change="onChange"
    style="width: 80%;margin: 20rpx auto;"
  />
  <!-- <nut-searchbar v-model="inputValue">
      <template #leftin>
        <Search2 />
      </template>
      <template #rightout>
        <text>搜索</text>
      </template>
  </nut-searchbar> -->
  <!-- <view v-for="product in filteredProducts.filteredIds" :key="product.ID" style="margin-bottom: 10rpx;"> -->
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
              <view class="parent-button-class2">
                <view class="minusbutton-class" >
                  <Minus  @click="decrementQuantity(product.ID)" size="18px" />  
                </view>
                <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
                <view class="addbutton-class">
                  <Plus @click="incrementQuantity(product.ID)" size="20px"/>
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
  --nut-input-font-size: 24rpx;
  --nut-divider-line-height: 0.1rpx;
  --nut-divider-margin: 15rpx 10rpx;

  // --nut-card-left-border-radius:30rpx;
  // --nut-tabs-vertical-titles-width: 120rpx;
}


</style>