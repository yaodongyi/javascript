/*
 * @Author: yaodongyi
 * @Description:
 * @Date: 2019-05-05 23:13:37
 */
// const hacks = require('../../plugins/viewport-units-buggyfill.hacks');
// require('../../plugins/viewport-units-buggyfill').init({
//   hacks: hacks
// });

/**
 * @desc rem配置
 */
const baseSize = 20; // 设计图等比字体大小
const ui_width = 1980; // 设计图宽度
const min_width = 1440; // 屏幕最小宽度，小于此宽度则不再缩放
// 设置 rem 函数
function setRem() {
  const scale = document.documentElement.clientWidth > min_width ? document.documentElement.clientWidth / ui_width : min_width / ui_width;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
