/*
 * @Author: yaodongyi
 * @Date: 2019-08-23 15:47:43
 * @Description: service worker
 */
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js'); // workbox
importScripts('./static/js/workbox-sw.js'); // workbox
let pwa_version = 'version:ifc-1567592502503'; // 提交的版本号，用以更新service-worker;
let cacheList = ['/', 'index.html']; // 配置需要缓存的列表
// 监听 service worker 的 install 事件
self.addEventListener('install', function(event) {
  // 在事件上接了一个 ExtendableEvent.waitUntil() 方法——这会确保 Service Worker 不会在 waitUntil() 里面的代码执行完毕之前安装完成。
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
    // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
    caches
      .open(pwa_version)
      .then(function(cache) {
        // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
        return cache.addAll(cacheList);
      })
      .then(() => {
        self.skipWaiting(); // 跳过等待
      })
  );
});
// https://www.easy-mock.com/mock/5ccec7de7ffbe958f9bc418b/

// 我们可以在 install 的时候进行静态资源缓存，也可以通过 fetch 事件处理回调来代理页面请求从而实现动态资源缓存。
// 两种方式可以比较一下：
// on install 的优点是第二次访问即可离线，缺点是需要将需要缓存的 URL 在编译时插入到脚本中，增加代码量和降低可维护性；
// on fetch 的优点是无需更改编译过程，也不会产生额外的流量，缺点是需要多一次访问才能离线可用。
// 除了静态的页面和文件之外，如果对 Ajax 数据加以适当的缓存可以实现真正的离线可用， 要达到这一步可能需要对既有的 Web App 进行一些重构以分离数据和模板。
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // 来来来，代理可以搞一些代理的事情
      // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
      if (response) {
        return response;
      }
      // 如果 service worker 没有返回，那就得直接请求真实远程服务
      var request = event.request.clone(); // 把原始请求拷过来
      return fetch(request).then(function(httpRes) {
        // http请求的返回已被抓到，可以处置了。
        // 请求失败了，直接返回失败的结果就好了。。
        if (!httpRes || httpRes.status !== 200) {
          return httpRes;
        }
        // 请求成功的话，将请求缓存起来。
        var responseClone = httpRes.clone();
        caches.open(pwa_version).then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return httpRes;
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    console.log(event);
    self.skipWaiting();
  }
});

self.addEventListener('activate', function(event) {
  //   console.log(event);
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),
      // 清理旧版本
      caches.keys().then(function(cacheList) {
        return Promise.all(
          cacheList.map(function(cacheName) {
            if (cacheName !== pwa_version) {
              console.log(cacheName, pwa_version);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});
console.log(pwa_version);
