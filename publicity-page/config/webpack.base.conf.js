/*
 * @Author: yaodongyi
 * @Date: 2019-09-03 15:57:12
 * @Description:
 */

const webpack = require('webpack'); /* webpack */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*build html*/
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); /* 错误提示 */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); /* css分离 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); /*build css*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const html = require('html-withimg-loader'); /*打包html src图片资源*/
const ImageWebpackLoader = require('image-webpack-loader'); /*压缩图片*/

const env = process.env.WEBPACK_ENV === 'build' ? true : false; // 判断 build/server 用以设置hash值
console.log('---env---', env);

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
/**
 * 全局注入文件，vendor为node_modules抽离文件，其他为entry引入的js文件。
 */
const splitChunks_js = ['vendor', 'sw', 'rem']; // 分离的js文件。用于chunks注入

const pages = require('../src/pages'); // pages文件
const ENTRY = Symbol('entry'); // 入口文件
const HTMLWEBPACKPLUGIN = Symbol('HtmlWebpackPlugin'); // page文件
// 根据传入的pages路由生成多页面
const PAGES_PLUGIN = function() {
  return Object.entries(pages).map(([prop, val]) => {
    return {
      /* 有入口文件entry的时候写入[ENTRY] */
      [ENTRY]: new (function() {
        if (!val.entry) return;
        return Object.assign(
          {},
          {
            [val.name.split('.')[0]]: val.entry
          }
        );
      })(),
      /* 页面文件写入[HTMLWEBPACKPLUGIN] */
      [HTMLWEBPACKPLUGIN]: new (function() {
        return new HtmlWebpackPlugin({
          filename: val.name,
          template: val.path,
          hash: true,
          inject: true,
          favicon: './favicon.ico', // 添加小图标
          chunks: [val.name.split('.')[0], ...splitChunks_js] /* 如果有多个入口文件，则可以配置多个entry,若没有则全部使用index */
        });
      })()
    };
  });
};
// console.log(...PAGES_PLUGIN().map(res => res[HTMLWEBPACKPLUGIN]));
// console.log(...PAGES_PLUGIN().map(res => res[ENTRY]));

const config = {
  entry: Object.assign(
    {
      index: './src/index.js', // 默认首页
      sw: './src/registerServiceWorker.js', // 全局注入serviceWorker
      rem: './src/assets/js/common/rem.js' // 全局多页面注入rem，根元素设置font-size。
    },
    ...PAGES_PLUGIN().map(res => res[ENTRY]) // 多页面入口文件并入
  ),
  Plugins: [
    //css分离生成link
    new ExtractTextPlugin({
      filename: env ? 'css/[name]-[chunkHash:3].css' : 'css/[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      // 编译时添加全局常量
      'process.env': require('./api.env.js')
    }),
    new webpack.ProvidePlugin({
      // 使用jq
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      // 编译html
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: env ? true : false,
      favicon: './favicon.ico', // 添加小图标
      chunks: ['index', ...splitChunks_js]
    }),
    ...PAGES_PLUGIN().map(res => res[HTMLWEBPACKPLUGIN]), // 根据传入的pages路由生成多页面
    new FriendlyErrorsPlugin() // 提示错误插件
  ],
  module: {
    rules: [
      // {
      //   test: /\.less$/,
      //   loader: 'style-loader!css-loader!less-loader!postcss-loader'
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'style-loader!css-loader!postcss-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: env ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
console.log('webpack.base.conf.js...');
// console.log(...config.Plugins);
module.exports = config;
