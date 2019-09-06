<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:54
 * @Description: 基础vue-cli3项目配置
 -->

# pwa + history 模式 基础vue-cli3项目配置

### 详细说明可阅读代码 [👉同步博客说明👈](https://blog.csdn.net/qq_40146880/article/details/100078805)

##### 1.[history模式配置(设置mode:为history, base:基路径'nginx上配置的目录')。](./src/router.js)
##### 2.[开启pwa配置,同时附上vue-cli3脚手架build及dev配置。(vue.config,js)](./vue.config.js)
##### 3.[registerServiceWorker.js里面,配置内容更新时刷新页面。](./src/registerServiceWorker.js)
##### 5.[附上本地调试nginx配置。](./nginx.conf)

##### 6.[http axios拦截器。](./src/utils/http.js)
##### 7.[postcss 使用vw vh 与 rem 共存方式,实现不同倍率设计图同时用px开发。(本项目引用vant)](./postcss.config.js)
##### vh、vw、rem究极适配方案可以参考👉 https://blog.csdn.net/qq_40146880/article/details/98057328


### 1.[history模式配置(设置mode:为history, base:基路径'nginx上配置的目录')。](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/src/router.js)
```javascript
import Vue from 'vue';
import Router from 'vue-router';

const component = function(url) {
  return () => import(`@/views/${url}`);
};

Vue.use(Router);

export default new Router({
  mode: 'history', // hash / history
  // /pwa-vue为nginx负载均衡配置的目录,如果是根目录则为“/”
  base: process.env.NODE_ENV === 'production' ? '/pwa-vue' : process.env.BASE_URL, 
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
```
nginx 配置。
```conf
# /pwa-vue 为项目的基路径,代理到proxy_pass
location /pwa-vue/ {
    proxy_pass http://localhost/github-javascript/javascript/pwa-vuedemo/dist/; # 放在nginx上的目录
    root   html;
    index  index.html index.htm;
}
```
> mac 的 web 文件放在`/usr/local/var/www/` 下面，也就是`proxy_pass` === `/usr/local/var/www/github-javascript/javascript/pwa-vuedemo/dist/`    
> 
> window 的打开下载的nginx有一个html文件夹，和上面的配置一样扔里面就行（Linux 的貌似也是html）。    
> 
> 打开页面链接为 `http://localhost/pwa-vue`    


### 2.[开启pwa配置,同时附上vue-cli3脚手架build及dev配置。(vue.config,js)](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/vue.config.js)

> [内容太多还是直接前往文件查看～](./vue.config.js)

### 3.[registerServiceWorker.js里面,配置内容更新时刷新页面。](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/src/registerServiceWorker.js)
```javascript
// 在vue-cli3根目录下的registerServiceWorker.js，有一个updated函数 (Dialog为vant的弹出框)
    updated() {
      Dialog.alert({
        message: '您浏览的网站有更新！'
      }).then(() => {
        window.location.reload(true);
      });
      console.log('New content is available; please refresh.');
    },
```
### 5.[附上本地调试nginx配置。](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/nginx.conf)
```conf
# 如果没有https域名则直接用localhost,也就是按照上面的配置即可。
# 如果有https域名的话，配置443端口，url则为 https://waituntil.online/pwa-vue

server_name  waituntil.online; # 这里设置了https的域名 如果没有则使用初始值
# server_name  127.0.0.1; 

listen 443 ssl;
ssl_certificate      ssl/*******_waituntil.online.pem; # 域名的pem 放在nginx下的ssl目录
ssl_certificate_key  ssl/*******_waituntil.online.key; # 域名的key 放在nginx下的ssl目录
ssl_session_timeout 5m;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
```
### 6.[http axios拦截器。](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/src/utils/http.js)
> 说明 process.env.VUE_APP_API 开发环境，生产环境的文件可以在项目根目录增加 .env.development 和 .env.production 进行配置。
```javascript
// http.js文件
import axios from 'axios';
import qs from 'qs';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_API;
} else {
  axios.defaults.baseURL = '/api';
}

axios.interceptors.request.use(
  request => {
    request.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8', //json
      Accept: 'application/json'
    };
    // request.data = qs.stringify(request.data);
    console.log(`%c 发送 ${request.url.replace(process.env.VUE_APP_API, '')} `, 'background:#00CC6E;color:#ffffff', request);
    return request;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(`%c 接收 ${response.config.url.replace(process.env.VUE_APP_API, '')} `, 'background:#1E1E1E;color:#bada55', response);
    return response.data;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axios;
```
```javascript
// 使用则 新建api.js文件
import axios from './http.js';
/**
 * 测试接口
 * @param {Object} params
 * @api {post} https://www.easy-mock.com/mock/5ccec7de7ffbe958f9bc418b/all
 */
export const all_api = params => {
  return axios.get(`all`, params);
};
```
### 7.[postcss 使用vw vh 与 rem 共存方式,实现不同倍率设计图同时用px开发。(本项目引用vant)](https://github.com/yaodongyi/javascript/blob/master/pwa-vuedemo/postcss.config.js)
##### vh、vw、rem究极适配方案可以参考👉 [https://blog.csdn.net/qq_40146880/article/details/98057328](https://blog.csdn.net/qq_40146880/article/details/98057328)