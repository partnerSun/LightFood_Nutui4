<script setup>
import TabBar from '../../components/TabBar.vue';
import { reactive, toRefs, onMounted, ref } from 'vue';
import {categoryData} from './categoryData.js';

const tabIndex= ref(2)
const data = reactive({
  categoryInfo: {},
  category: [{}],
  categoryChild: [{}]
})

onMounted(() => {
  setTimeout(() => { getData() }, 500)
})


const getData = () => {
    const { categoryInfo, categoryChild } = categoryData
    data.categoryInfo = categoryInfo
    data.category = categoryInfo.category
    data.categoryChild = categoryChild
}
const change = (index) => {
  data.categoryChild = [].concat(data.categoryInfo.category[index ].children)
}
const onChange = () => {
  console.log('当前分类数据')
}
</script>

<template>
    <!-- <TabBar></TabBar> -->
    <nut-category :category="data.category" @change="change">
      <nut-category-pane :categoryChild="data.categoryChild" @onChange="onChange"> </nut-category-pane>
    </nut-category>

    <TabBar :tabindex="tabIndex"></TabBar>
</template>