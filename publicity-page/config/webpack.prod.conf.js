/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description: 生成环境配置
 */
require('./sw-version.js'); // 自动获取/设置 registerServiceWorker.js 每次更新的版本号
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); /* 删除dist */

const WebpackBase = require('./webpack.base.conf'); // 获取公用配置/基础配置
console.log(WebpackBase.entry);

const config = {
  /*状态*/
  mode: 'production',
  //入口文件
  entry: WebpackBase.entry,
  //编译后的文件路径
  output: {
    path: buildPath,
    filename: 'js/[name]-[chunkHash:3].js'
  },
  optimization: WebpackBase.optimization,
  module: {
    rules: [...WebpackBase.module.rules]
  },
  plugins: [
    new CleanWebpackPlugin(), // 删除dist
    new CopyWebpackPlugin([
      // copy静态文件
      {
        from: './src/manifest.json',
        to: 'manifest.json',
        ignore: ['.*']
      },
      {
        from: './src/service-worker.js',
        to: 'service-worker.js',
        ignore: ['.*']
      },
      {
        from: './static',
        to: 'static',
        ignore: ['.*']
      }
    ]),
    ...WebpackBase.Plugins
  ]
};

module.exports = config;
