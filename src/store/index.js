import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro';  // 假设使用 Taro 框架

export const useProductStore = defineStore('productStore', () => {
    // 服务端所有的商品信息，通过传值赋值
    let allProductInfo = ref([]);

    // 从本地缓存中加载商品数量
    const loadQuantities = () => {
        const savedQuantities = Taro.getStorageSync('productQuantities');
        return savedQuantities ? JSON.parse(savedQuantities) : {};
    };

    // 商品数量
    const quantities = ref(loadQuantities());

    // 初始化商品列表，未选择的商品初始数量设为0
    const initQuantitiesValue = () => {
        allProductInfo.value.forEach(product => {
        if (!(product.ID in quantities.value)) {
            quantities.value[product.ID] = 0;
        }
        });
    };
    // 过滤商品数量>0的商品
    // 返回 1. 由商品id组成的数组 2. 结算商品总数量
    const filterProductQuantities = (items) => {
        const filteredIds = Object.keys(quantities.value).filter(id => quantities.value[id] > 0);
        const filteredItems =items.filter(item => filteredIds.includes(item.ID));
        const totalQuantity = filteredIds.reduce((total, id) => total + parseInt(quantities.value[id], 10), 0);
        return {
            filteredItems: filteredItems,
            totalQuantity: totalQuantity
        };
      };
      
      // 计算并返回商品数量>0的商品和商品总数量,用于购物车显示
      const filteredProducts = computed(() => {
        return filterProductQuantities(allProductInfo.value);
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
        quantities.value[id]=0
      };
    };
    // 优惠后总价
    const vipTotalMoney=computed(()=>{
      let total=0
      filteredProducts.value.filteredItems.forEach(product=>{
        total+=product.CurrentPrice*quantities.value[product.ID]
      })
      return total.toFixed(2); // 始终保留两位小数并返回字符串
    })
    // 原总价
    const originalTotalMoney=computed(()=>{
      let total=0
      filteredProducts.value.filteredItems.forEach(product=>{
        total+=product.OriginalPrice*quantities.value[product.ID]
      })
      return total.toFixed(2); // 始终保留两位小数并返回字符串
    })
  return {
    allProductInfo,
    quantities,
    initQuantitiesValue,
    incrementQuantity,
    decrementQuantity,
    filteredProducts,
    vipTotalMoney,
    originalTotalMoney
  };
});
