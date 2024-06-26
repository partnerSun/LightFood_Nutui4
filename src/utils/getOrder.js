import {getOrderInfoApi} from '../api/order.js'
import Taro from '@tarojs/taro'

export const getOrderInfo = async (params) => {
    let orderUpdateRes = await getOrderInfoApi(params)
    if (orderUpdateRes.data.status == 200) {
      let orderInfo=orderUpdateRes.data.data.items
      console.log("订单信息",orderInfo)
      return orderInfo
    //   Taro.setStorageSync('orderInfo',orderInfo)
    }
}
