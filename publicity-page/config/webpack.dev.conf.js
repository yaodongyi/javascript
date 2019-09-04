/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description: 开发环境配置
 */
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const WebpackBase = require('./webpack.base.conf'); // 获取公用配置/基础配置
console.log(WebpackBase);

const config = require('./index.js'); /* 运行参数 */

const devWebpackConfig = webpackMerge({
  mode: 'development',
  entry: WebpackBase.entry,
  optimization: WebpackBase.optimization,
  watch: true,
  module: {
    rules: [...WebpackBase.module.rules]
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    host: config.dev.host,
    hot: true,
    port: config.dev.port,
    inline: true,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {
          warnings: false,
          errors: true
        }
      : false,
    publicPath: config.dev.assetsPublicPath,
    contentBase: path.join(__dirname, '../src'), // 设置提供内容的目录
    watchContentBase: true, // 监听热重载
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新
    ...WebpackBase.Plugins
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;

      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
