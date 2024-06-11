import ComponentsPlugin  from 'unplugin-vue-components/webpack';
// import Components  from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = {
  projectName: 'lightFood',
  date: '2024-5-27',
  designWidth (input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    '@tarojs/plugin-http'
  ]
  ,
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  sass:{
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  mini: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
        resolvers: [
          NutUIResolver({
            // importStyle: 'sass',
            taro: true
          })
        ]
      }))
    },
    enableExtract:true,
    miniCssExtractPluginOption: {
        ignoreOrder: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        }
      },
      // https://taro-docs.jd.com/docs/static-reference#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%A0%B7%E5%BC%8F%E4%B8%AD%E5%BC%95%E7%94%A8%E6%9C%AC%E5%9C%B0%E8%B5%84%E6%BA%90
      url: {
        enable: true,
        config: {
          limit: 102400 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [
          NutUIResolver({
            importStyle: 'sass',
            taro: true
          })
        ]
      }))
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  };

  return merge({}, config, require('./prod'))
}
