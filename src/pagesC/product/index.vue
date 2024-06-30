<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,watch,ref } from 'vue';
import Taro,{ useLoad } from '@tarojs/taro'
import { Minus,Plus,IconFont,Search2 , } from '@nutui/icons-vue-taro'
import { AtIcon} from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import '../../assets/iconfont/iconfont.css'
import './index.css'
import {productCheck} from '../../api/product.js'
import { useProductStore } from '../../store/index.js';
import { storeToRefs } from 'pinia'

// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})
const productStore = useProductStore();
const { quantities,allProductInfo,filteredProducts,vipTotalMoney,originalTotalMoney } = storeToRefs(productStore)
const { initQuantitiesValue,incrementQuantity,decrementQuantity } = productStore


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
      allProductInfo.value=items
      initQuantitiesValue()
    } else {
      Taro.showToast({
        title: "获取商品失败",
        icon: 'error',
        duration: 2000,
      })
      console.log("获取商品信息失败")
    }
  } 
  catch (err) {
    Taro.showToast({
      title: String(err),
      icon: 'none',
      duration: 2000,
    })
    console.error("商品信息获取失败", err)
  }
})


const {ptypes}=toRefs(data)

// 根据 Ptype 获取相应的商品
const getProductsByType = (ptype) => {
  let tmpProduct = data.items.filter(product => product.Ptype === ptype)
  // console.log(tmpProduct)
  return tmpProduct
}

const inputContentPostion=ref('center')

const inputValue=ref('')



// 监视 quantities 的变化并同步到 localStorage
watch(quantities, (newQuantities) => {
  if (newQuantities) {
    // console.log("quantities", quantities.value);
    Taro.setStorageSync('productQuantities', JSON.stringify(newQuantities));
  }
}, { deep: true });



const showActionSheet=ref(false)
const bottomActionSheet=()=>{
  showActionSheet.value = !showActionSheet.value
}
// // 优惠后总价
// const vipTotalMoney=computed(()=>{
//   let total=0
//   filteredProducts.value.filteredItems.forEach(product=>{
//     total+=product.CurrentPrice*quantities.value[product.ID]
//   })
//   return total.toFixed(2); // 始终保留两位小数并返回字符串
// })
// // 原总价
// const originalTotalMoney=computed(()=>{
//   let total=0
//   filteredProducts.value.filteredItems.forEach(product=>{
//     total+=product.OriginalPrice*quantities.value[product.ID]
//   })
//   return total.toFixed(2); // 始终保留两位小数并返回字符串
// })

// 支付
const pay=()=>{
  let uinfo =Taro.getStorageSync('userInfo')
   // 判断是否已注册会员
  if (uinfo){
    // 判断是否存在结算商品
    if (filteredProducts.value.totalQuantity){
      console.log("跳转至结算页面")
      Taro.navigateTo({
        url: '/pagesC/pay/index',
        // events: {
        //   // 监听来自 结算 页面的数据
        //   sendDataToCurrentPage(data) {
        //     if (data){
        //       console.log('接收到来自结算页面的数据:', data);
        //     }else{
        //       console.log('接收到来自结算页面的数据:', data);
        //     }
        //   }
        // },
        success:  (res) =>{
          Taro.showLoading({
            title: '加载中...',
            mask: false,
          })
          setTimeout(function () {
            Taro.hideLoading()
          }, 1000)
          // 使用eventChannel发送数据到 结算 页面
          // res.eventChannel.emit('sendDataToOpenedPage', 
          // { 
          //   productInfo: filteredProducts.value.filteredItems,
          //   productNum:  quantities.value,
          //   productTotalnum: filteredProducts.value.totalQuantity,
          //   total:vipTotalMoney.value 
          // });
        }
      })
    }else{
      console.log("无结算商品")
    }
  }else{
    Taro.showToast({
      title: "请先完成注册登录",
      icon: 'none',
      duration: 2000,
    })
    setTimeout(function () {
      Taro.navigateTo({
        url: '/pagesB/personal/index',
      })
      }, 2000)
    }

}

// 清空购物车
const trash=()=>{
  Taro.removeStorage('productQuantities')
  // loadQuantities()
  quantities.value={}
  initQuantitiesValue()
  
}
// 


const onBlur=()=>{
  console.log("失去焦点")
  // showSearchBar.value = false
}


// 跳转到搜索过滤页面
const jumpFilterPage=()=> {
  Taro.navigateTo({
    url: '/pagesC/product/searchFilterPage',
  })
}

const showDetail = (id) => {
  Taro.navigateTo({
    url: '/pagesA/enjoy-detail/index?id='+id,
  })
}
</script>

<template>
<!-- <view style="display: flex;flex-direction: column;justify-content:space-between;"> -->
  <!-- 搜索框+商品信息 -->
  <view>
  <nut-searchbar v-model="inputValue" @click-input="jumpFilterPage" @blur="onBlur"  style="width: 90%;margin: 20rpx auto;">
    <!-- <template #rightout> 搜索 </template> -->
    <template #leftin>
      <Search2 size="14px"/>
    </template>
  </nut-searchbar>
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
          @click="showDetail(product.Shareid)"
        >
          <template #footer> 
            <view style="width: 100%;">
              <!-- <view class="discount-cs">
                {{ product.Discount }}折
              </view> -->
              <!-- 使用事件修饰符 stop 来阻止事件冒泡。这可以防止子组件的点击事件冒泡到父组件，从而触发父组件的点击事件。 -->
              <view class="parent-button-class">
                <view class="minusbutton-class" >
                  <Minus  @click.stop="decrementQuantity(product.ID)" size="21px" />  
                </view>
                <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
                <view class="addbutton-class">
                  <Plus @click.stop="incrementQuantity(product.ID)" size="22px" />
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
    <!-- pop-class="actionsheet-class" -->
    <nut-popup
      v-model:visible="showActionSheet"
      position="bottom"
      z-index="900"
      round
      safe-area-inset-bottom
      pop-class="actionsheet-class"
      
    >
      <view style="padding-bottom: 260rpx;padding-top: 10rpx;">
        <view  hover-class="none" hover-stop-propagation="false"  class="trash-class" >  
          <!-- 删除 -->
          <view style="display: flex;margin-left: 16rpx;" @click="trash">
            <text style="font-size: 14px; font-weight: 350; letter-spacing: 0px;line-height: 16px;margin: auto 1px;">清空购物车</text>
            <AtIcon value='trash' color='black' size="14" style="margin: auto 1px;"></AtIcon>
          </view>
          <!-- 关闭 -->
          <view @click="bottomActionSheet" style="margin-right: 16rpx;">
            <IconFont name="close" color='black' size="12px" style="margin: auto 1px;"></IconFont>
          </view>
        </view>
        <nut-divider style="width: 98%;margin: 20rpx auto 18rpx"/> 
        <view v-for="product in filteredProducts.filteredItems" :key="product.ID" style="margin-bottom: 10rpx;">
        <nut-card
          :img-url="product.Img"
          :title="product.Product"
          :price="product.OriginalPrice"
          :vip-price="product.CurrentPrice"
          @click="showDetail(product.Shareid)"
          class="actionsheet-shopping-card-class"
        >
          <template #footer> 
            <view style="width: 100%;">
              <view class="parent-button-class2">
                <view class="minusbutton-class" >
                  <Minus  @click.stop="decrementQuantity(product.ID)" size="20px" />  
                </view>
                <nut-input type="number" :readonly="true" :border="false" :input-align="inputContentPostion" v-model="quantities[product.ID]"   />
                <view class="addbutton-class">
                  <Plus @click.stop="incrementQuantity(product.ID)" size="20px"/>
                </view>
              </view>
            </view>
          </template>
        </nut-card>
        <nut-divider style="width: 90%;margin: 0 auto 18rpx"/>
        </view>
      </view>
    </nut-popup>
  </view>
  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style  lang="scss">

page {
  --nut-input-font-size: 26rpx;
  --nut-divider-line-height: 0.1rpx;
  --nut-divider-margin: 15rpx 10rpx;
  // --nut-card-left-border-radius:30rpx;
  // --nut-tabs-vertical-titles-width: 120rpx;
}


</style>