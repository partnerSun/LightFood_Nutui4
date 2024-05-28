
<template>
  <nut-card :img-url="imgUrl" :title="title" style="flex-direction:column;">
    <img :src="imgUrl" alt="cover" class="nut-grid-content-1"/>
    <view class="card-title">{{ title }}</view>
  </nut-card>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  imgUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.cover-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.card-title {
  padding: 10px 0;
  font-size: 16px;
  color: #333;
}

.nut-grid-content-1{
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  width: 90%; 
  height: 85%; 
  border-radius: 15px;
}
</style>
