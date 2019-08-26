/*
 * @Author: yaodongyi
 * @Date: 2019-08-10 10:38:05
 * @Description: vant 按需引入
 */
import Vue from 'vue';
import { Button } from 'vant';

let vant_use = (...val) => {
  for (let i = 0; i < [...val].length; i++) Vue.use(val[i]);
};
vant_use(Button);
