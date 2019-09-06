<!--
 * @Author: yaodongyi
 * @Date: 2019-08-28 10:52:48
 * @Description: 
 -->
# publicity-page
 
> 该脚手架集成docker打包配置，serviceWorker离线缓存(每次打包自动更新版本号，弹出更新网页提示)，多页面路由配置，postcss根据rem，vwvh转换器配置，补全css前缀，自动加上favicon，多页面html打包，less，webpack常规各种分离代码、压缩、混淆等等～

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### 目录结构

```javascript
├── config ---------------------- [webpack配置]("./config")
│    ├── api.env.js ------------- 开发/生成环境api接口，根据环境切换
│    ├── sw-version.js ---------- service-worker 每次打包时自动更新版本号配置
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
│   ├── plugins ---------------------- 公共插件
│   │    └──Toast -------------------- 弹出框(此处引入为serviceWorker更新弹窗)
│   │
│   ├── pages ------------------------ 页面目录
│   │    ├──index.html --------------- html文件(默认首页)
│   │    └──index.js ----------------- js文件(默认首页js入口文件)
│   │
│   ├─── js -------------------- 公用方法
│   │    ├── common ------------ 项目公用方法(放置全局引入方法)
│   │    │   ├── axios --------- axios拦截器
│   │    │   ├── methods ------- 注入全局 $web(methods-API)
│   │    │   ├── navigator ----- 判断终端及浏览器内核
│   │    │   └── rem ----------- 项目全局引入的rem转化器
│   │    │ 
│   │    └── utils  ------------ js组件(放置按需引入方法)
│   │
│   ├── pages.js ----------------------- 页面路由文件(改删增页面时，需重启项目)
│   │    └── page首页name，固定命名index(如需修改请对应修改pwa及webpack默认入口设置) 
│   │
│   ├── registerServiceWorker.js -------------- 离线缓存注册文件
│   ├── service-worker.js --------------------- 离线缓存
│   ├── manifest.json ------------------------- 离线缓存注册清单
│   └── ******
│   
└── README.md 
```

