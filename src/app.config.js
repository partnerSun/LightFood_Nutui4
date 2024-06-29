export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/vipSignIn',
  ],
  subpackages: [
    {
      root: "pagesB",
      pages: [
        'personal/index',
        'card/index',
        'card-info/index',
        'contact/index',
        'user-record/index',
        'about-us/index',
        'about-us/privacy-policy',
        'about-us/qa',
      ]
    }, {
      root: "pagesA",
      pages: [
        'enjoy/index',
        'enjoy-detail/index',
      ],
    }
    , {
      root: "pagesC",
      pages: [
        'pay/index',
        'product/index',
        'product/searchFilterPage',
      ],
    }
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
