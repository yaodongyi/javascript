/*
 * @Author: yaodongyi
 * @Date: 2019-08-09 18:24:38
 * @Description:
 */
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
console.log(process.env);
console.log(process.env.VUE_APP_LOCAL);
console.log(process.env.VUE_APP_URL);
module.exports = {
  publicPath: './', // 根域上下文目录
  outputDir: 'cmvip-mengxiaoer', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  //   pages: {},
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  // transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map';
    } else {
      // 生产环境配置
    }
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    };
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          vue$: 'vue/dist/vue.esm.js'
        }
      }
    });
  },
  chainWebpack: config => {
    // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // console.log(config)
    config.resolve.symlinks(true);
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式------>开启有可能导致ui框架无样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      // css预设器配置项
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      stylus: {}
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: {
    // 第三方插件配置
  },
  pwa: {
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    name: 'pwa-vuedemo',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes', // 是否开启apple的pwa
    appleMobileWebAppStatusBarStyle: 'black', // 苹果移动网络应用状态栏样式
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      importWorkboxFrom: 'local', // 本地加载workbox。 cdn,local
      skipWaiting: true, // 跳过等待
      clientsClaim: true, // 让sw立即接管网页
      exclude: [/\.map$/, /asset-manifest\.json$/], // 排除
      navigateFallback: process.env.VUE_APP_URL + '/index.html', // 返回到首页
      //黑名单
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$')
      ],
      //运行时缓存
      runtimeCaching: [
        {
          urlPattern: /.*\.js/, // URL匹配规则，匹配任何包含 /.*\.js/ 的同源请求
          /**
           * @desc handler 缓存策略
           * @param StaleWhileRevalidate 如果有缓存直接返回（没有缓存则直接请求接口），并请求接口拿到请求接口更新cache，但不会重新返回到界面。(下一次刷新的时候会返回到界面)。
           * @desc 这种策略的意思是当请求的路由有对应的 Cache 缓存结果就直接返回，在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存，如果本来就没有 Cache 缓存的话，直接就发起网络请求并返回结果。 
           * @param NetworkFirst  网络优先
           * @desc 请求接口如果有返回则更新cache并返回界面。如果没有则读取cache
           * @param CacheFirst  缓存优先
           * @desc 先读取cache 如果有缓存则读取缓存，没有缓存则发起请求，并写入cache。
           * @param NetworkOnly  只用网络
           * @desc 比较直接的策略，直接强制使用正常的网络请求，并将结果返回给客户端，这种策略比较适合对实时性要求非常高的请求。
           * @param CacheOnly  只用缓存
           * @desc 这个策略也比较直接，直接使用 Cache 缓存的结果，并将结果返回给客户端，这种策略比较适合一上线就不会变的静态资源请求。
           */
          handler: 'networkFirst',
          //选项
          options: {
            // Use a custom cache name for this route.
            cacheName: 'my-js-cache',
            expiration: {
              // 缓存过期时间
              maxEntries: 5, // 最大缓存数量
              maxAgeSeconds: 60 // 缓存时间（s）
            },
            backgroundSync: {
              // 配置后台同步
              name: 'my-jsqueue-name',
              options: {
                maxRetentionTime: 60 * 60 // 最大保留时间
              }
            },
            broadcastUpdate: {
              // 更新栏目
              channelName: 'my-jsupdate-channel'
            },
            plugins: [
              {
                // 缓存即将更新
                cacheWillUpdate: () => {
                  console.log(`%c js cacheWillUpdate`, `color:#006DCB;`);
                },
                // 缓存更新
                cacheDidUpdate: () => {
                  console.log(`%c js cache update`, `color:#006DCB;`);
                },
                // 将使用缓存的响应
                cachedResponseWillBeUsed: () => {
                  console.log(`%c js cachedResponseWillBeUsed`, `color:#006DCB;`);
                },
                // 请求正在获取。。。
                requestWillFetch: () => {
                  console.log(`%c js cache requestWillFetch`, `color:#006DCB;`);
                },
                // 请求获取失败
                fetchDidFail: () => {
                  console.log(`%c js cache fetchDidFail`, `color:red;`);
                }
              }
            ],
            // matchOptions和fetchOptions用于配置处理程序。
            matchOptions: {
              ignoreSearch: true // 忽略搜索
            },
            // 可缓存响应
            cacheableResponse: {
              statuses: [200] // 状态为200的响应可缓存
            }
          }
        },
        {
          urlPattern: new RegExp('https://www.easy-mock.com/mock/5ccec7de7ffbe958f9bc418b/all'),
          handler: 'networkFirst',
          options: {
            // Use a custom cache name for this route.
            cacheName: 'my-api-cache',
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60
            },
            backgroundSync: {
              name: 'my-queue-name',
              options: {
                maxRetentionTime: 60 * 60
              }
            },
            plugins: [
              {
                cacheDidUpdate: () => {
                  console.log(`%c api cache update`, `color:#006DCB;`);
                }
              }
            ],
            matchOptions: {
              ignoreSearch: true
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    }
  },
  devServer: {
    disableHostCheck: true,
    open: true,
    hot: true,
    // host: '10.8.1.211',
    // host: '127.0.0.1',
    port: 8887,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com/mock/5ccec7de7ffbe958f9bc418b', // 后台接口域名
        ws: true, // websocket
        changOrigin: true, // 是否跨域
        // 重写
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
    // before: app => {}
  }
};
