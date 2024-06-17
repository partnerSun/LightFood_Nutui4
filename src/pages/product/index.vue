<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,watch ,computed,  ref } from 'vue';
import { useLoad } from '@tarojs/taro'
import {productCheck} from '../../api/product.js'
import { Minus,Plus,Cart,IconFont  } from '@nutui/icons-vue-taro'
import { AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";
import Taro from '@tarojs/taro'
import '../../assets/iconfont/iconfont.css'
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

const inputContentPostion=ref('center')

const inputValue=ref('')
const showDecrementButton=ref('false')
const onChange=(value)=> {
  inputValue.value=value
  console.log('搜索框内容改变value', value)
}

const onActionClick=() =>{
  console.log('搜索框内容改变', inputValue.value)
  console.log('点击了搜索按钮')
}

// 从本地缓存中加载商品数量
const loadQuantities = () => {
  const savedQuantities = Taro.getStorageSync('productQuantities');
  console.log("savedQuantities ",savedQuantities )
  return savedQuantities ? JSON.parse(savedQuantities) : {};
};
// 
const quantities = ref(loadQuantities());

data.items.forEach(product => {
  if (!(product.ID in quantities.value)) {
    quantities.value[product.ID] = 0;
  }
});

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

let currentProductQuantities=reactive({});
// 监视 quantities 的变化并同步到 localStorage
watch(quantities, (newQuantities) => {
  if (newQuantities) {
    // console.log("quantities", quantities.value);
    Taro.setStorageSync('productQuantities', JSON.stringify(newQuantities));
    // currentProductQuantities.value = newQuantities;
    // console.log("商品数量变化", currentProductQuantities.value);
  }
}, { deep: true });


// 过滤商品数量>0的商品
const filterProductQuantities = (items, quantities) => {
  const filteredIds = Object.keys(quantities.value).filter(id => quantities.value[id] > 0);
  return items.filter(item => filteredIds.includes(item.ID));
};

const filteredProducts = computed(() => {
  return filterProductQuantities(data.items, quantities);
});

const showActionSheet=ref(false)
const bottomActionSheet=()=>{
  showActionSheet.value = !showActionSheet.value
}
</script>

<template>
<!-- <view style="display: flex;flex-direction: column;justify-content:space-between;"> -->
  
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
      <view v-for="product in getProductsByType(ptype)" :key="product.ID" style="margin-bottom: 20rpx;">
        <nut-card
          :img-url="product.Img"
          :title="product.Product"
          :price="product.OriginalPrice"
          :vip-price="product.CurrentPrice"
          :shop-desc="product.Descr"
          delivery="自取"
        >
          <template #footer> 
            <view style="width: 100%;">
              <view class="discount-cs">
                {{ product.Discount }}折
              </view>
              <view class="parent-button-class">
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
      </view>
    </nut-tab-pane>
  </nut-tabs>  

  </view>
  <view style="position: relative;">
    <view class="shopping-card-class">
      <IconFont class="shopping-class"  color="#f0c60f" font-class-name="iconfont"  size="42" class-prefix="icon" name="gouwuche" @click="bottomActionSheet"/>
    </view>
    <!-- ActionSheet 动作面板 底部 -->
    <nut-action-sheet
      v-model:visible="showActionSheet"
      title="购物车"
      class="actionsheet-class"
    >
      <view style="padding-bottom: 260rpx;">
        <view v-for="product in filteredProducts" :key="product.ID" style="margin-bottom: 10rpx;">
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
        </view>
      </view>
    </nut-action-sheet>
  </view>
  <TabBar :tabindex="tabIndex"></TabBar>
</template>

<style  lang="scss">

page {
  --nut-input-font-size: 24rpx;
  // --nut-tabs-vertical-titles-width: 120rpx;
}

.nut-tabs.vertical>.nut-tabs__titles {
  padding: 0;
}

.nut-tab-pane {
  padding: 10rpx;
  margin-left: 10rpx;
  /* margin-bottom: 20rpx; */
}


.at-search-bar__action {
    color: black;
    font-size: 14PX;
    background-color: white;
    opacity: 0;
}

/* 会员价颜色 */
.nut-card .nut-card__right .nut-card__right__price .nut-card__right__price__origin.nut-price {
    margin-left: 16rpx;
    color: #eec167;
    // color:#fa2c19;
}


/* 隐藏商店名样式 */
.nut-card .nut-card__right .nut-card__right__shop .nut-card__right__shop__name {
  display: none; 
}
/* 商品图片 */
.nut-card .nut-card__left>.h5-img {
  border-radius: 10rpx;
}
/* 跳动 动画 */
@keyframes inflate {
  0% {
    transform: scale(1); /* 初始大小 */
  }
  50% {
    transform: scale(1.2); /* 变大到 1.2 倍 */
  }
  100% {
    transform: scale(1); /* 还原到初始大小 */
  }
}
/* 发光动画 */
@keyframes blink-glow {
  0% { box-shadow: 0 0 10px rgba(226, 15, 103, 0.7); }
  50% { box-shadow: 0 0 20px rgba(226, 15, 103, 0.7); }
  100% { box-shadow: 0 0 10px rgba(226, 15, 103, 0.7); }
}
/* 折扣 */
.discount-cs{
  font-size: 24rpx;
  color: gray; 
  font-style: italic;
  margin-top: 10rpx;
  margin-left: 16rpx;
  animation: inflate 2s infinite;

}
/* shop desc */
.nut-tag--danger {
  animation: blink-glow 3s infinite;
}


.nut-input{
  width: 60rpx;
  padding: 1rpx;
}
.nut-card {
  margin: auto;
}
.parent-button-class{
  padding: 0;
  display: flex;
  width: 60%;
  margin-left: 110rpx;
  margin-top: 20rpx;
}
  /* 商品添加 */
  .minusbutton-class{
    /* margin-left: 210rpx; */
    margin: auto;
    display: flex;
    justify-content:center;
    align-items:center;
    width: 30rpx; /* 按钮宽度 */
    height: 30rpx; /* 按钮高度 */
    border: 1rpx solid #f4d859; /* 去掉边框 */
    box-sizing: border-box; /* 包含边框在内的总宽度 */
    border-radius: 50%; /* 圆形 */
    cursor: pointer; /* 鼠标样式 */
    transition: transform 0.2s; /* 添加过渡效果 */
  }
  // 商品增加
  .addbutton-class{
    /* margin-left: 210rpx; */
    padding: 0;
    margin: auto;
    width: 30rpx; /* 按钮宽度 */
    height: 30rpx; /* 按钮高度 */
    background-color: #f4d859; /* 背景颜色 */
    border: none; /* 去掉边框 */
    border-radius: 50%; /* 圆形 */
    cursor: pointer; /* 鼠标样式 */
    transition: transform 0.2s; /* 添加过渡效果 */
  }
  // 底部结算托盘
.shopping-card-class{
  width: 70%;
  height: 64rpx;
  background-color: rgba(0, 0, 0, 0.885);
  // background-color: whitesmoke;
  margin: auto;
  position: fixed;
  // bottom: 180rpx;
  bottom: 12%;
  left: 0;
  right: 0; /* 将组件的左右边界置于视口的左右边界 */
  margin-left: auto; /* 自动调整左边距 */
  margin-right: auto; /* 自动调整右边距 */
  text-align: center;
  border: none; /* 去掉边框 */
  border-radius: 50rpx; /* 圆形 */
  padding: 0px;
  z-index: 1000;
  display: flex;
  justify-content:space-between;
}
// 购物车图标
.shopping-class{
  // position: fixed;
  position: absolute;
  left: 14rpx;
  // right: 0; 
  bottom: 12rpx;
  z-index: 1001;
}

// 左侧边最后一个tab距离底部的距离
.nut-tabs.vertical>.nut-tabs__titles.scrollable .nut-tabs__titles-placeholder {
    height: 120rpx;
}

// 底部动作面板
.actionsheet-class{
  position: fixed; /* 确保其位置固定 */
  // bottom: 100rpx;
  left: 0;
  right: 0;
  z-index: 999; 
}

// .nut-action-sheet{
//   height: 70vh;
// }
// .nut-popup--bottom{
//   padding-bottom: 100rpx;
// }
//购物车 加减按钮的父级
.parent-button-class2{
  padding: 0;
  display: flex;
  width: 60%;
  margin-left: 212px;
  margin-top: 18rpx;

}



// 购物车商品卡片
.actionsheet-shopping-card-class{
  width: 90%;
}

// 购物车商品左部
.actionsheet-shopping-card-class .nut-card__left {
  width: 160rpx;
  height: 160rpx;
}
// 购物车原价
.actionsheet-shopping-card-class .nut-price {
    color:  #6d6767;
}


// 原价添加删除线
.nut-price .nut-price--normal{
  text-decoration: line-through ; 
}
.nut-price .nut-price--decimal-normal{
  text-decoration: line-through ; 
  // 小数点与位数的字体大小与前面的一致
  font-size: 32rpx;
}

// 原价添加删除线会影响会员价，会员价单独去除删除线
.nut-card__right__price__origin .nut-price--normal{
  text-decoration: none; 
}
.nut-card__right__price__origin .nut-price--decimal-normal{
  text-decoration: none; 
}


</style>