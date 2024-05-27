import { createApp } from 'vue'
// import { Searchbar } from '@nutui/nutui-taro'
import './app.css'
// import '@nutui/icons-vue-taro/dist/style_iconfont.css';
// import '@nutui/nutui-taro/dist/packages/tabbaritem/index.scss';

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// App.use(Searchbar)

export default App
