<script setup>
import './index.css';
import icon_font_solid_1_2x from '../../assets/images/icon-font-solid-1@2x.png';

// 解决透传 Attributes 
defineOptions({
  inheritAttrs: false
})

</script>

<template>
  <navigator url="/pagesB/about-us/privacy-policy" hover-class="none">
    <view class="content-box">
      <view class="content1">用户隐私协议</view>
      <image mode='aspectFill' class='photos' :src='icon_font_solid_1_2x'></image>
    </view>
  </navigator>

  <view class="blank"></view>

  <navigator url="/pagesB/about-us/qa" hover-class="none">
    <view class="content-box">
    <view class="content1">常见问题</view>
    <image mode='aspectFill' class='photos' :src='icon_font_solid_1_2x'></image>
    </view>
  </navigator>

  <view class="blank"></view>
  <view class="version">Version 1.0 17:30:54</view>
</template>