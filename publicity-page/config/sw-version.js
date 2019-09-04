/*
 * @Author: yaodongyi
 * @Date: 2019-09-02 12:51:43
 * @Description: 设置 registerServiceWorker.js 每次更新的版本号
 */
const fs = require('fs');
const package_version = require('../package.json').version; // 取package.json的版本号
const random = require('../src/assets/js/utils/meth.js').randomSign(3); // 取随机数为版本号
/**
 * @desc fs.readFile 读取文件
 * @param {String} url
 * @param {String} "utf8" 编码
 * @callback (报错信息"error"，文件文本"files")
 * @desc fs.writeFile 写入文件
 * @param {String} url
 * @param {String} result 要写入文件的文本
 * @param {String} "utf8" 编码
 * @callback (报错信息"error")
 */
fs.readFile('./src/service-worker.js', 'utf8', function(err, files) {
  let version = files.match(/let pwa_version = 'version:(\S*?)';/)[1]; // 获取版本号
  var result = files.replace(new RegExp(version, 'g'), random); // 替换版本号
  //   console.log(result, files);
  fs.writeFile('./src/service-worker.js', result, 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
});
