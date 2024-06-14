<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs,  ref } from 'vue';
import { useLoad } from '@tarojs/taro'
import {productCheck} from '../../api/product.js'
import { Search,Plus } from '@nutui/icons-vue-taro'
import { AtSearchBar } from 'taro-ui-vue3'
import "taro-ui-vue3/dist/style/components/search-bar.scss";

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



const inputValue=ref('')

const onChange=(value)=> {
  inputValue.value=value
  console.log('搜索框内容改变value', value)
}

const onActionClick=() =>{
  console.log('搜索框内容改变', inputValue.value)
  console.log('点击了搜索按钮')
}

const addProduct=()=>{
  console.log('点击了添加按钮')
}

</script>

<template>
  <AtSearchBar
    actionName='搜索'
    :value="inputValue"
    @action-click="onActionClick"
    @change="onChange"
    style="width: 90%;margin: 20rpx auto;"
  />
  <nut-tabs v-model="activeTab" direction="vertical" title-scroll  name="productTabs">
    <nut-tab-pane v-for="ptype in ptypes" :key="ptype" :title="ptype" :pane-key="ptype">
      <view v-for="product in getProductsByType(ptype)" :key="product.ID" style="margin-bottom: 20rpx;">
        <nut-card
          :img-url="product.Img"
          :title="product.Product"
          :price="product.OriginalPrice"
          :vip-price="product.CurrentPrice"
          :shop-desc="product.Descr"
          delivery="自提"
        >
          <template #footer> 
            <view>
              <view class="discount-cs">
                {{ product.Discount }}折
              </view>
              <Button  class="addbutton-cs" @click="addProduct" >
                <Plus color="black" size="18" />
              </Button>
            </view>


          </template>
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

/* 会员价 */
.nut-card .nut-card__right .nut-card__right__price .nut-card__right__price__origin.nut-price {
    margin-left: 16rpx;
    color: #d2a448;
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

/* 商品添加 */
.addbutton-cs{
  margin-left: 210rpx;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 30px; /* 按钮宽度 */
  height: 30px; /* 按钮高度 */
  background-color: #fcde51; /* 背景颜色 */
  border: none; /* 去掉边框 */
  border-radius: 50%; /* 圆形 */
  cursor: pointer; /* 鼠标样式 */
  padding: 0; /* 去掉内边距 */
  transition: transform 0.2s; /* 添加过渡效果 */
}

</style>