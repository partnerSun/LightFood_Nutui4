<script setup>
import './index.css'
// import contact from '../../assets/images/contact.png';

// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})


</script>
<template>
    <view class="title">联系我们</view>
    <view class="content">产品开发, 请联系我</view>
    <!-- <image mode='aspectFill' :src="contact" class="contact-img-class"></image> -->
    <image mode='aspectFill' src="https://light-food.wfzwrjx.cn/images/contact.jpg" class="contact-img-class"></image>
</template>

<style>
.contact-img-class{
    width: 100%;
    height: 630rpx;

}
</style>