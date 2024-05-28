<script setup>
import {onMounted,defineProps, ref, reactive} from 'vue'
import contentData from './info.js'
import Taro from '@tarojs/taro' 

let id = ref(0)
let result= reactive({})
onMounted(()=>{
   // const { id } = id; // 通过 query string 获取数据
   const params = Taro.getCurrentInstance().router.params;
  id.value = Number(params.id); // 确保 id 是数字类型

  // 查找对应 id 的数据
  result.value = contentData.find(item => item.id === id.value);

})


const showinfo =()=>{
    console.log("contentData:",contentData)
//    const  result = contentData.find(item => item.id === id.value);
    console.log("result:",result)
}


// props= ['id', 'name'], // 声明需要接收的参数
// onShow() {
//     console.log(this.id, this.name); // 输出：1, test
// }
// onLoad(options) {
//     const { id, name } = options; // 通过 query string 获取数据
//     // 或者
//     // const { id, name } = this.$router.params.state; // 通过 state 获取数据
//     console.log(id, name); // 输出：1, test
//   }
</script>

<template>
<view>
    这是首页某个信息的详情页
    {{ result }}
    <nut-button type="primary" @click="showinfo">Primary</nut-button>
</view>
</template>