/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description:
 */

let finalModule = {};
let env = process.env.WEBPACK_ENV;
console.log(env);
switch (env) { 
  case 'dev':
    finalModule = require('./config/webpack.dev.conf');
    break;
  default:
    finalModule = require('./config/webpack.prod.conf');
    break;
}
module.exports = finalModule;
 