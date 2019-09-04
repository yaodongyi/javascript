/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description: 
 */
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}, 
    host: '10.8.1.143',  
    port: 8769,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    devtool: 'cheap-source-map',
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    cssSourceMap: false
  },
}