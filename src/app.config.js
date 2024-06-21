export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/enjoy/index',
    'pages/product/index',
    'pages/personal/index',
    'pages/detail/index',
    'pages/card/index',
    'pages/card-info/index',
    'pages/login/vipSignIn',
    'pages/pay/pay',
    'pages/contact/index',
    'pages/user-record/index',
    'pages/about-us/index',
    'pages/about-us/privacy-policy',
    'pages/about-us/qa'
  ],
  // https://taro-docs.jd.com/docs/vue-page
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // enablePullDownRefresh: true,
    enableShareAppMessage: true,
    enableShareTimeline: true
  },
  permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序定位服务"
      },
      "scope.writePhotosAlbum": {
        "desc": "你的相册"
      },
    }
  
  
})
