/*
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description:入口文件
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './utils/vant.js';
import './utils/rem.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
