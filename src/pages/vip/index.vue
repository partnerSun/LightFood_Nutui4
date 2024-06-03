<script setup>
import { reactive,ref } from 'vue';

// 解决透传 Attributes
defineOptions({
  inheritAttrs: false
})


const  selector=reactive(['美国', '中国', '巴西', '日本'])
const selectorChecked=ref('美国')
      const  timeSel=ref('12:01')
       const dateSel=ref('2018-04-22')


const onChange= (e) => {
  selectorChecked.value = selector[e.detail.value]
}

const  onTimeChange=(e)=> {
        timeSel.value = e.detail.value
      }

const onDateChange=(e)=> {
        dateSel.value = e.detail.value
      }

</script>

<template>
      <view class="page-body">
    <view class="page-section">
      <text>地区选择器</text>
      <view>
        <picker mode="selector" :range="selector" @change="onChange">
          <view class="picker">
            当前选择：{{selectorChecked}}
          </view>
        </picker>
      </view>
    </view>
    <view class="page-section">
      <text>时间选择器</text>
      <view>
        <picker mode="time" @change="onTimeChange">
          <view class="picker">
            当前选择：{{timeSel}}
          </view>
        </picker>
      </view>
    </view>
    <view class="page-section">
      <text>日期选择器</text>
      <view>
        <picker mode="date" @change="onDateChange">
          <view class="picker">
            当前选择：{{dateSel}}
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>