## LIGHT FOOD
* 开发框架: [taro](https://taro-docs.jd.com/)
* ui: [nutui 4.0](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/start)
* 需安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
* 开发调试
```
npm run dev:weapp
```

* 生产打包
```
set NODE_ENV=production && taro build --type weapp --watch
```

### 注意
* pages和pagesB无差别，拆分为了降低主包大小
* [小程序官方](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html) 
* [taro解决方案:智能分包](https://taro-docs.jd.com/docs/mini-split-chunks-plugin)