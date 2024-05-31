export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/enjoy/index',
    'pages/product/index',
    'pages/personal/index',
    'pages/detail/index',
    'pages/vip/index',
  ],
  // https://taro-docs.jd.com/docs/vue-page
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    enableShareAppMessage: true,
    enableShareTimeline: true
  }
})
