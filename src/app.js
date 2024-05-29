import { createApp } from 'vue'
import './app.css'
// import { Swiper, SwiperItem ,Searchbar} from '@nutui/nutui-taro'


const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// App.use(Searchbar).use(Swiper).use(SwiperItem)

export default App
