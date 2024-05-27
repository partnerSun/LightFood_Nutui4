<script setup>
import {ref} from 'vue';
import TabBar from '../../components/TabBar.vue';
import { Dongdong } from '@nutui/icons-vue-taro';



const val = ref('')
const search = (text) => {
  console.log('search', text)
}
</script>

<template>
  <view class="" hover-class="none" hover-stop-propagation="false">
    <nut-searchbar v-model="val" @search="search"></nut-searchbar>
    <nut-grid :column-num="2">
      <nut-grid-item text="text"><Dongdong /></nut-grid-item>
      <nut-grid-item text="text"><Dongdong /></nut-grid-item>
      <nut-grid-item text="text"><Dongdong /></nut-grid-item>
    </nut-grid>
  </view>

  <TabBar :tabindex=0></TabBar>
</template>

<style>
</style>
