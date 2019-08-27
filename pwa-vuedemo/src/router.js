/*
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:43
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';

const component = function(url) {
  return () => import(`@/views/${url}`);
};

Vue.use(Router);

export default new Router({
  mode: 'history', // hash / history
  base: process.env.NODE_ENV === 'production' ? '/pwa-vue' : process.env.BASE_URL, // /pwa-vue为nginx负载均衡配置的目录,如果是根目录则为“/”
  routes: [
    {
      path: '/',
      name: 'home',
      component: component('Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: component('About.vue')
    }
  ]
});
