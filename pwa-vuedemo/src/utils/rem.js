/*
 * @Author: yaodongyi
 * @Description:
 * @Date: 2019-05-05 23:13:37
 */

/**
 * @desc 设置根据界面宽度375比16px进行响应式适配。postcss-pxtorem 设置"selectorBlackList":[".ignore",".hairlines","van"],忽略框架代码
 */
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 375;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};

window.onload = function() {
  // 兼容vh写法的插件
  window.viewportUnitsBuggyfill.init({ hacks: window.viewportUnitsBuggyfillHacks });
};
