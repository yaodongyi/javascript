<!--
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description: 
 -->
# publicity-page

> 该项目集成docker打包配置，serviceWorker离线缓存(每次打包更新版本号，弹出更新网页提示)，多页面路由配置，postcss根据rem，vwvh转换器配置，补全css前缀，自动加上favicon，多页面html打包，less，webpack常规各种分离代码、压缩、混淆等等～

### 目录结构

```javascript
├── config ---------------------- [webpack配置]("./config")
│    ├── api.env.js ------------- 开发/生成环境api接口，根据环境切换
│    ├── sw-version.js ---------- service-worker 每次打包时更新号配置
│    ├── webpack.base.conf ------ webpack公用配置
│    ├── webpack.dev.conf ------- webpack开发配置
│    ├── webpack.prod.conf ------ webpack生产环境配置
│    └── index.js --------------- 开发环境基础配置
│
├── docker -------------------------- dockerfile文件
├── build.sh ------------------------ docker shell文件
├── docker-compose.yml -------------- dockerfile文件
├── docker这块没有用docker打包的无需在意(直接忽略)
│
├── package.json ---------------- 项目package.json
├── dist ------------------------ 打包后代码
├── static ---------------------- 静态文件 
│    ├── images
│    └── js .....
│ 
├── src ------------------------------ 源码目录
│   ├── assets ----------------------- 资源目录
│   ├── components ------------------- 公共组件
│   ├── pages ------------------------ 页面目录
│   │    ├──***.html
│   │    └──***.js
│   │
│   ├─── js ------------------- 公用方法
│   │    ├──common ------------ 项目公用方法
│   │    │   ├──axios --------- axios拦截器
│   │    │   └──rem ----------- 项目全局引入的rem转化器
│   │    │ 
│   │    └──utils  ------------ 页面js组件
│   │
│   ├── index.html --------------------- html文件
│   ├── index.js ----------------------- js文件
│   ├── pages.js ----------------------- 页面路由文件
│   ├── registerServiceWorker.js -------------- 离线缓存注册文件
│   ├── service-worker.js --------------------- 离线缓存
│   ├── manifest.json ------------------------- 离线缓存注册清单
│   └── ******
│   
└── README.md 
```

