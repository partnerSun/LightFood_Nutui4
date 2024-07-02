<template>
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>
      <cover-view
        v-for="(item, index) in list"
        :key="index"
        class="tab-bar-item"
        @tap="switchTab(index, item.pagePath)"
      >
        <!-- <cover-image :src="selected.value === index ? item.selectedIconPath : item.iconPath" /> -->
        <cover-view :style="{ color: selected.value === index ? selectedColor : color }">
          {{ item.text }}
        </cover-view>
      </cover-view>
    </cover-view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Taro from '@tarojs/taro';
  import { useStore } from 'vuex';
  
  // 初始化 Vuex store
  const store = useStore();
  
  // 响应式数据和计算属性
  const selected = computed(() => store.getters['tab/getSelected']);
  const color = ref('#000000');
  const selectedColor = ref('#DC143C');
  
  const list = ref([
    {
      pagePath: '/pages/index/index',
    //   selectedIconPath: '/static/images/tabbar_home_on.png',
    //   iconPath: '/static/images/tabbar_home.png',
      text: '首页'
    },
    {
      pagePath: '/pagesA/enjoy/index',
    //   selectedIconPath: '/static/images/tabbar_cate_on.png',
    //   iconPath: '/static/images/tabbar_cate.png',
      text: '工艺'
    },
    {
      pagePath: '/pagesC/product/index',
    //   selectedIconPath: '/static/images/tabbar_cart_on.png',
    //   iconPath: '/static/images/tabbar_cart.png',
      text: '商品'
    },
    {
      pagePath: '/pagesB/personal/index',
    //   selectedIconPath: '/static/images/tabbar_my_on.png',
    //   iconPath: '/static/images/tabbar_my.png',
      text: '我的'
    }
  ]);
  
  // 方法定义
  const switchTab = (index, url) => {
    setSelected(index);
    Taro.switchTab({ url });
  };
  
  const setSelected = (index) => {
    store.dispatch('tab/setSelected', index);
  };
  </script>
  
  <style lang="scss">
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
  }
  
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .tab-bar-item cover-image {
    width: 54px;
    height: 54px;
  }
  
  .tab-bar-item cover-view {
    font-size: 20px;
  }
  </style>
  