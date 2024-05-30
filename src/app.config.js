export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/enjoy/index',
    'pages/product/index',
    'pages/personal/index',
    'pages/detail/detail',
    'pages/index/vip',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  }
})
