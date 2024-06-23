<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,watch ,computed,  ref } from 'vue';
import { useLoad } from '@tarojs/taro'
import {productCheck} from '../../api/product.js'
import { Minus,Plus,Cart,IconFont  } from '@nutui/icons-vue-taro'
import { AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui-vue3'
import '../../assets/iconfont/iconfont.css'
import './index.css'

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
    const info = await productCheck()
    const { items } = info.data.data || {}

    if (items && items.length > 0) {
      data.items = items
      data.ptypes = [...new Set(items.map(item => item.Ptype))]
      activeTab.value = items[0].Ptype
      // console.log("商品信息获取成功", data.items)
      // console.log("商品类型获取成功", data.ptypes)
      initQuantitiesValue()
    } else {
      console.log("token过期或没有商品信息")
    }
  } 
  catch (err) {
    console.error("商品信息获取失败", err)
  }
})


const {ptypes}=toRefs(data)

// 根据 Ptype 获取相应的商品
const getProductsByType = (ptype) => {
  return data.items.filter(product => product.Ptype === ptype)
}

const inputContentPostion=ref('center')

const inputValue=ref('')

const onChange=(value)=> {
  inputValue.value=value
  console.log('搜索框内容改变value', value)
}

const onActionClick=() =>{
  console.log('搜索框内容改变', inputValue.value)
  console.log('点击了搜索按钮')
}




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
    let currentProductQuantities = newQuantities;
    console.log("商品数量变化", currentProductQuantities);
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
  const  { filteredIds, totalQuantity } = filterProductQuantities(data.items, quantities);
  return {
    filteredIds: filteredIds, //商品ID的数组
    totalQuantity: totalQuantity //结算商品的总数量
  };
});


const showActionSheet=ref(false)
const bottomActionSheet=()=>{
  showActionSheet.value = !showActionSheet.value
}
// 优惠后总价
const vipTotalMoney=computed(()=>{
  let total=0
  filteredProducts.value.filteredIds.forEach(product=>{
    total+=product.CurrentPrice*quantities.value[product.ID]
  })
  return total.toFixed(2); // 始终保留两位小数并返回字符串
})
// 原总价
const originalTotalMoney=computed(()=>{
  let total=0
  filteredProducts.value.filteredIds.forEach(product=>{
    total+=product.OriginalPrice*quantities.value[product.ID]
  })
  return total.toFixed(2); // 始终保留两位小数并返回字符串
})

// 支付
const pay=()=>{
  // console.log("判断是否已注册会员等其他逻辑")
  if (filteredProducts.value.totalQuantity){
    console.log("跳转至结算页面")

    Taro.navigateTo({
      url: '/pages/pay/index',
      events: {
        // 监听来自 结算 页面的数据
        sendDataToCurrentPage(data) {
          // console.log('接收到来自结算页面的数据:', data);
          if (data){
            console.log('接收到来自结算页面的数据:', data);
          }else{
            console.log('接收到来自结算页面的数据:', data);
            // Taro.navigateTo({
            //   url: '/pages/product/index',
            // })
          }
        }
      },
      success: function (res) {
        Taro.showLoading({
          title: '加载中...',
          mask: false,
        })
        setTimeout(function () {
          Taro.hideLoading()
        }, 1000)
        // 发送数据到 结算 页面
        res.eventChannel.emit('sendDataToOpenedPage', { productInfo: filteredProducts.value.filteredIds,productNum:quantities.value,productTotalnum:filteredProducts.value.totalQuantity,total:vipTotalMoney.value });
      }
    })
 }else{
  console.log("无结算商品")
 }
}

// 清空购物车
const trash=()=>{
  Taro.removeStorage('productQuantities')
  // loadQuantities()
  quantities.value={}
  initQuantitiesValue()
  
}
</script>

<template>
<!-- <view style="display: flex;flex-direction: column;justify-content:space-between;"> -->
  <!-- 搜索框+商品信息 -->
  <view>
    <AtSearchBar
    actionName='搜索'
    :value="inputValue"
    @action-click="onActionClick"
    @change="onChange"
    style="width: 90%;margin: 20rpx auto;"
  />
  
  <nut-tabs class="nub-tabs-class" v-model="activeTab" direction="vertical" title-scroll  name="productTabs" style="height: 81vh;" >
    <nut-tab-pane v-for="ptype in ptypes" :key="ptype" :title="ptype" :pane-key="ptype">
      <view v-for="product in getProductsByType(ptype)"  :key="product.ID" style="margin-bottom: 20rpx;">
        <nut-card
          :img-url="product.Img"
          :title="product.Product"
          :price="product.OriginalPrice"
          :vip-price="product.CurrentPrice"
          :shop-desc="product.Descr"
          :delivery="`${(product.Discount)}折`"
        >
          <template #footer> 
            <view style="width: 100%;">
              <!-- <view class="discount-cs">
                {{ product.Discount }}折
              </view> -->
              <view class="parent-button-class">
                <view class="minusbutton-class" >
                  <Minus  @click="decrementQuantity(product.ID)" size="14px" />  
                </view>
                <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
                <view class="addbutton-class">
                  <Plus @click="incrementQuantity(product.ID)" size="14px" />
                </view>
              </view>
            </view>
          </template>
        </nut-card>
      </view>
    </nut-tab-pane>
  </nut-tabs>  

  </view>
  <!-- 悬浮按钮+购物车actionsheet内容 -->
  <view style="position: relative;">
    <view class="shopping-card-class">
      <!-- 购物车按钮 -->
      <view class="shopping-num-class"><text>{{ filteredProducts.totalQuantity }}</text></view>
      <IconFont class="shopping-class"  color="#f7bb44" font-class-name="iconfont"  size="42" class-prefix="icon" name="gouwuche" @click="bottomActionSheet"/>
      <!-- 悬浮按钮内容 -->
      <view class="total-calss">
        <text style="color: white;font-size: 18rpx;">￥{{ originalTotalMoney }}</text>
        <text style="color: #f7bb44;font-size:24rpx"> 优惠后 </text>
        <text style="color: #f7bb44;">￥{{ vipTotalMoney }}</text>
      </view>
      <!-- 结算按钮 -->
      <view v-if="filteredProducts.totalQuantity" class="pay-class" @click="pay">去结算</view>
      <view v-else="filteredProducts.totalQuantity" class="none-pay-class" >无商品</view>
    </view>
    <!-- ActionSheet 动作面板 底部 -->
    <nut-action-sheet
      v-model:visible="showActionSheet"
      title="购物车"
      class="actionsheet-class"
    >
      <view style="padding-bottom: 260rpx;padding-top: 10rpx;">
        <view  hover-class="none" hover-stop-propagation="false"  class="trash-class" @click="trash">  
          <span style="font-size: 24rpx; font-weight: 350; letter-spacing: 1px;line-height: 50rpx;">清空购物车</span>
          <AtIcon value='trash' color='black' size="14" style="margin: auto 0;"></AtIcon>
        </view>
        <nut-divider style="width: 98%;margin: 20rpx auto 18rpx"/> 
        <view v-for="product in filteredProducts.filteredIds" :key="product.ID" style="margin-bottom: 10rpx;">
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
                  <Minus  @click="decrementQuantity(product.ID)" size="16px" />  
                </view>
                <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
                <view class="addbutton-class">
                  <Plus @click="incrementQuantity(product.ID)" size="16px"/>
                </view>
              </view>
            </view>
          </template>
        </nut-card>
        <nut-divider style="width: 90%;margin: 0 auto 18rpx"/>
        </view>
      </view>
    </nut-action-sheet>
  </view>
  <TabBar :tabindex="tabIndex"></TabBar>
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