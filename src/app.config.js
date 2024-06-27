export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/enjoy/index',
    'pages/product/index',
    'pages/product/searchFilterPage',
    'pagesB/personal/index',
    'pages/enjoy-detail/index',
    'pagesB/card/index',
    'pagesB/card-info/index',
    'pages/login/vipSignIn',
    'pages/pay/index',
    'pagesB/contact/index',
    'pagesB/user-record/index',
    'pagesB/about-us/index',
    'pagesB/about-us/privacy-policy',
    'pagesB/about-us/qa'
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
    },
  lazyCodeLoading: 'requiredComponents',
  
  
})
