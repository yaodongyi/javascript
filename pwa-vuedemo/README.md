<!--
 * @Author: yaodongyi
 * @Date: 2019-08-24 14:46:54
 * @Description: 基础vue-cli3项目配置
 -->

# pwa + history 模式 基础vue-cli3项目配置

##### 1.[history模式配置(设置mode:为history, base:基路径'nginx上配置的目录')。](./src/router.js)
##### 2.[开启pwa配置,同时附上vue-cli3脚手架build及dev配置。(vue.config,js)](./vue.config.js)
##### 3.[registerServiceWorker.js里面,配置内容更新时刷新页面。](./src/registerServiceWorker.js)
##### 5.[附上本地调试nginx配置。](./nginx.conf)

##### 6.[http axios拦截器。](./src/utils/http.js)
##### 7.[postcss 使用vw vh 与 rem 共存方式,实现不同倍率设计图同时用px开发。(本项目引用vant)](./postcss.config.js)
##### vh、vw、rem究极适配方案可以参考👉 https://blog.csdn.net/qq_40146880/article/details/98057328
