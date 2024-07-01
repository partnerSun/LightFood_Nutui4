<script>
import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { IconFont } from '@nutui/icons-vue-taro'

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    // 检查用户是否已经授权
    Taro.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        // 用户已经授权，直接获取用户信息
        getUserInfo()
      }
    })
  }, [])

  const getUserInfo = () => {
    Taro.getUserInfo().then(res => {
      setUserInfo(res.userInfo)
    }).catch(err => {
      console.error('getUserInfo error', err)
    })
  }

  // const showShareMenu = () => {
  //   if (!userInfo) {
  //     // 用户未授权，发起授权请求
  //     Taro.getUserInfo().then(res => {
  //       setUserInfo(res.userInfo)
  //       Taro.showShareMenu({
  //         withShareTicket: true,
  //         success(res) {
  //           console.log('showShareMenu success', res)
  //         },
  //         fail(err) {
  //           console.error('showShareMenu fail', err)
  //         }
  //       })
  //     }).catch(err => {
  //       console.error('getUserInfo error', err)
  //     })
  //   } else {
  //     // 用户已经授权，直接调用 showShareMenu
  //     Taro.showShareMenu({
  //       withShareTicket: true,
  //       success(res) {
  //         console.log('showShareMenu success', res)
  //       },
  //       fail(err) {
  //         console.error('showShareMenu fail', err)
  //       }
  //     })
  //   }
  // }



</script>

<template>
<IconFont name="share" size="20" color="#000000" @click="share"></IconFont>
</template>