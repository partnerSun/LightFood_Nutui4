<script setup>
import {onMounted,defineProps} from 'vue'
import contentData from './info.js'

onMounted(()=>{
    const { id } = id; // 通过 query string 获取数据
    // 或者
    // const { id, name } = this.$router.params.state; // 通过 state 获取数据
    console.log(id); // 输出：1, test
})

props= ['id', 'name'], // 声明需要接收的参数
onShow() {
    console.log(this.id, this.name); // 输出：1, test
}
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
</view>
</template>