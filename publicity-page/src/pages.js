/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 12:08:15
 * @Description: 配置页面路由
 */
const component = url => `./src/pages${url}`; // 例: ./src/pages/home/index.js
/**
 * @param {String} name 路由名
 * @param {String} entry 入口文件
 * @param {String} path 页面路径
 * @desc 每次添加页面都需重启dev，或者重新build。
 */
module.exports = [
  {
    name: 'home.html',
    entry: component('/home/index.js'), // 是否添加入口文件(可选)
    path: component('/home/index.html')
  },
  {
    name: 'info.html',
    entry: component('/about/info/index.js'),
    path: component('/about/info/index.html')
  },
  {
    name: 'about.html',
    entry: component('/about/index.js'),
    path: component('/about/about.html')
  }
];
